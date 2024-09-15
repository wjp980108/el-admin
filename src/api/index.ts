import request from '@/utils/axios';

interface Login {
  token: string
}

// 登录
export function login(data: AnyObj) {
  return request<Login>({
    url: '/api/login',
    method: 'post',
    data,
  });
}

export interface UserInfo {
  userInfo: AnyObj
  menus: AppRoute.RowRoute[]
}

// 获取用户信息
export function userInfo() {
  return request<UserInfo>({
    url: '/api/userInfo',
    method: 'get',
  });
}
