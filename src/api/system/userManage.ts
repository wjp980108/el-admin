import request from '@/utils/axios';

// 获取用户列表
export function userList(params?: User.Params) {
  return request<User.Data[]>({
    url: '/api/user/list',
    method: 'get',
    params,
  });
}

// 新增用户
export function createUser(data: User.Data) {
  return request({
    url: '/api/user/create',
    method: 'post',
    data,
  }, {
    loading: true,
    loadingText: '保存中，请稍等...',
  });
}

// 编辑用户
export function editUser(data: User.Data) {
  return request({
    url: '/api/user/update',
    method: 'post',
    data,
  }, {
    loading: true,
    loadingText: '保存中，请稍等...',
  });
}

// 删除用户
export function deleteUser(id: string) {
  return request({
    url: '/api/user/delete',
    method: 'post',
    data: {
      id,
    },
  }, {
    loading: true,
    loadingText: '删除中，请稍等...',
  });
}

// 设置用户状态
export function upUserStatus(data: { id: string, isEnabled: boolean }) {
  return request({
    url: '/api/user/updateEnabled',
    method: 'post',
    data,
  }, {
    loading: true,
    loadingText: '更新中，请稍等...',
  });
}

// 获取部门列表
export function deptList(params?: AnyObj) {
  return request<Department.Data[]>({
    url: '/api/department/list',
    method: 'get',
    params,
  });
}

// 获取角色列表
export function roleList(params?: AnyObj) {
  return request<Role.Data[]>({
    url: '/api/role/list',
    method: 'get',
    params,
  });
}
