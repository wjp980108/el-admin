import request from '@/utils/axios';

/**
 * 登录
 * @param data 接口参数
 */
export function login(data: AnyObj) {
  return request({
    url: '/auth/login',
    method: 'post',
    data,
  });
}
