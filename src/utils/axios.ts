import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import qs from 'qs';
import { createDiscreteApi } from 'naive-ui';
import { router } from '@/router';
import { useAppStore } from '@/stores';

const pendingMap = new Map();

const { message: NMessage } = createDiscreteApi(['message']);
function createAxios<Data = any, T = AppAxios.ApiPromise<Data>>(axiosConfig: AxiosRequestConfig, options: AppAxios.Options = {}): T {
  // 获取用户信息
  // const userStore = useUserStore();

  // 创建 axios
  const service = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 0,
  });

  // 默认配置
  const config: AppAxios.Options = {
    cancelDuplicateRequest: true,
    loading: false,
    loadingText: '加载中，请稍等...',
    message: false,
    messageText: '',
    showErrorMessage: true,
  };

  // 如果有传入配置，则合并配置，否则使用默认配置
  options = Object.assign(config, options);

  // 接口请求之前拦截
  service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // console.log(config, '请求拦截器');
      removePending(config);
      // 取消重复请求
      options.cancelDuplicateRequest && addPending(config);
      // 显示 Loading
      options.loading && setLoading(true, options.loadingText);

      // // 自动携带 token
      // if (userStore.getToken) {
      //   if (config.method === 'post')
      //     config.data = { token: userStore.getToken, ...config.data };
      //   if (config.method === 'get')
      //     config.params = { token: userStore.getToken, ...config.params };
      // }

      return config;
    },
    (error) => {
      // console.log(error, '请求拦截器: error');
      return Promise.reject(error);
    },
  );

  // 接口请求响应后拦截
  service.interceptors.response.use(
    async (response: AxiosResponse<AppAxios.ResponseData>) => {
      // console.log(response, '响应拦截器');
      const { data, config } = response;
      // 删除重复请求
      removePending(config);
      // 关闭loading
      options.loading && setLoading(false);

      // 登录过期
      if (data.status === 1) {
        // userStore.removeToken();
        await router.push('/login');
        NMessage.error(data.message);
        return Promise.reject(data);
      }

      // 提示错误信息
      if (data.status && data.status !== 200) {
        NMessage.error(data.message, {
          duration: 5000,
        });
        // 不等于 0 时, 页面中具体逻辑不执行
        return Promise.reject(data);
      }

      // 是否需要提示
      if (options.message) {
        // 自定义消息提示权重大于接口返回消息提示
        const message = options.messageText ? options.messageText : data.message;
        NMessage.success(message);
      }

      return response;
    },
    (error) => {
      // console.log(error, '响应错误拦截器');
      // 删除重复请求
      error.config && removePending(error.config);
      // 关闭loading
      options.loading && setLoading(false);
      // 处理错误状态码
      options.showErrorMessage && httpErrorStatusHandle(error);
      return Promise.reject(error);
    },
  );

  return service(axiosConfig) as T;
}

export default createAxios;

/**
 * 获取每个请求唯一的key
 */
function getPendingKey(config: InternalAxiosRequestConfig) {
  let { data } = config;
  const { url, method, params } = config;
  if (typeof data === 'string')
    data = qs.parse(data); // response里面返回的config.data是个字符串对象
  return [url, method, qs.stringify(params), qs.stringify(data)].join('&');
}

/**
 * 储存每个请求唯一值, 也就是cancel()方法, 用于取消请求
 */
function addPending(config: InternalAxiosRequestConfig) {
  const pendingKey = getPendingKey(config);
  config.cancelToken
    = config.cancelToken
    || new axios.CancelToken((cancel) => {
      if (!pendingMap.has(pendingKey)) {
        pendingMap.set(pendingKey, cancel);
      }
    });
}

/**
 * 删除重复的请求
 */
function removePending(config: InternalAxiosRequestConfig) {
  const pendingKey = getPendingKey(config);
  if (pendingMap.get(pendingKey)) {
    const cancelToken = pendingMap.get(pendingKey);
    cancelToken(pendingKey);
    pendingMap.delete(pendingKey);
  }
}

/**
 * 配置 Loading
 */
function setLoading(show: boolean, text?: string) {
  const appStore = useAppStore();
  appStore.setLoading({
    loadingShow: show,
    loadingText: text,
  });
}

/**
 * 处理异常
 */
function httpErrorStatusHandle(error: any) {
  // 处理被取消的请求
  if (axios.isCancel(error))
    return console.error(`自动取消重复请求${error.message}`);
  let message = '';
  if (error && error.response) {
    switch (error.response.status) {
      case 302:
        message = '接口已重定向!';
        break;
      case 400:
        message = '参数不正确!';
        break;
      case 401:
        message = '您未登录, 或者登录已经超时, 请先登录!';
        break;
      case 403:
        message = '您没有操作权限!';
        break;
      case 404:
        message = `请求地址时出错: ${error.response.config.url}`;
        break;
      case 408:
        message = '请求超时!';
        break;
      case 409:
        message = '系统中已存在相同的数据!';
        break;
      case 500:
        message = '服务器内部错误!';
        break;
      case 501:
        message = '未实现服务!';
        break;
      case 502:
        message = '网管错误!';
        break;
      case 503:
        message = '服务不可用!';
        break;
      case 504:
        message = '该服务暂时不可用。请稍后再试!';
        break;
      case 505:
        message = '不支持HTTP版本!';
        break;
      default:
        message = '异常问题，请联系网站管理员!';
        break;
    }
  }
  if (error.message.includes('timeout'))
    message = '网络请求超时!';
  if (error.message.includes('Network'))
    message = window.navigator.onLine ? '服务器异常!' : '您已断开连接!';
  NMessage.error(message);
}
