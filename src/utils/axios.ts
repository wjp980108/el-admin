import type { AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults, InternalAxiosRequestConfig } from 'axios';
import { router } from '@/router';
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import { ElLoading, ElMessage } from 'element-plus';
import qs from 'qs';

const pendingMap = new Map();
let loading: any;
let requestCount: number = 0;

function createAxios<Data = any, T = AppAxios.ApiPromise<Data>>(axiosConfig: AxiosRequestConfig, options: AppAxios.Options = {}): T {
  // 获取用户信息
  const userStore = useUserStore();

  const serviceConfig: CreateAxiosDefaults = {
    baseURL: '',
    timeout: 0,
    paramsSerializer: (params) => {
      const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value != null),
      );
      return qs.stringify(filteredParams, { arrayFormat: 'repeat' });
    },
  };
  if (import.meta.env.VITE_APP_ENV !== 'dev')
    serviceConfig.baseURL = import.meta.env.VITE_BASE_URL;

  // 创建 axios
  const service = axios.create(serviceConfig);

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
      if (options.cancelDuplicateRequest)
        addPending(config);

      // 显示 Loading
      if (options.loading)
        createLoading(options.loadingText);

      // 自动携带 token
      if (userStore.accessToken) {
        config.headers.Authorization = `Bearer ${userStore.accessToken}`;
      }

      return config;
    },
    (error) => {
      // console.log(error, '请求拦截器: error');
      return Promise.reject(error);
    },
  );

  // 接口请求响应后拦截
  service.interceptors.response.use(
    async (response: AxiosResponse<any>) => {
      // console.log(response, '响应拦截器');
      const { data, config } = response;
      // 删除重复请求
      removePending(config);
      // 关闭loading
      if (options.loading)
        closeLoading();

      // 登录过期
      if (data.code === 1) {
        userStore.removeToken();
        await router.push('/login');
        ElMessage.error({
          message: data.message,
        });
        return Promise.reject(data);
      }

      // 提示错误信息
      if (data.code !== 200) {
        ElMessage.error({
          message: data.message,
          duration: 5000,
        });
        // 不等于 0 时, 页面中具体逻辑不执行
        return Promise.reject(data);
      }

      // 是否需要提示
      if (options.message) {
        // 自定义消息提示权重大于接口返回消息提示
        const message = options.messageText ? options.messageText : data.message;
        ElMessage.success(message);
      }

      return data;
    },
    (error) => {
      // console.log(error, '响应错误拦截器');
      // 删除重复请求
      if (error.config)
        removePending(error.config);

      // 关闭loading
      if (options.loading)
        closeLoading();

      // 处理错误状态码
      if (options.showErrorMessage)
        httpErrorStatusHandle(error);

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
 * 储存每个请求唯一值, 也就是 cancel() 方法, 用于取消请求
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
 * 创建 Loading
 */
function createLoading(text?: string) {
  if (requestCount === 0) {
    loading = ElLoading.service({
      text,
      background: 'rgba(0, 0, 0, 0.7)',
    });
    requestCount++;
  }
}

/**
 * 关闭 Loading
 */
function closeLoading() {
  requestCount--;
  if (requestCount === 0)
    loading.close();
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
  ElMessage.error(message);
}
