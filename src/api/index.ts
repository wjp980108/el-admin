import request from '@/utils/axios';

/**
 * 登录
 * @param data 接口参数
 */
export function login(data: AnyObj) {
  return request({
    url: '/api/User/Login',
    method: 'post',
    data,
  }, {
    message: true,
    messageText: '登录成功',
    loading: true,
  });
}
