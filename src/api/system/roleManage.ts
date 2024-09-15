import request from '@/utils/axios';

// 获取角色列表
export function roleList(params?: Role.Params) {
  return request<Role.Data[]>({
    url: '/api/role/list',
    method: 'get',
    params,
  });
}

// 新增角色
export function createRole(data: Role.Data) {
  return request({
    url: '/api/role/create',
    method: 'post',
    data,
  }, {
    loading: true,
    loadingText: '保存中，请稍等...',
  });
}

// 编辑角色
export function editRole(data: Role.Data) {
  return request({
    url: '/api/role/update',
    method: 'post',
    data,
  }, {
    loading: true,
    loadingText: '保存中，请稍等...',
  });
}

// 删除角色
export function deleteRole(id: string) {
  return request({
    url: '/api/role/delete',
    method: 'post',
    data: {
      id,
    },
  }, {
    loading: true,
    loadingText: '删除中，请稍等...',
  });
}

// 设置角色状态
export function upRoleStatus(data: { id: string, isEnabled: boolean }) {
  return request({
    url: '/api/role/updateEnabled',
    method: 'post',
    data,
  }, {
    loading: true,
    loadingText: '更新中，请稍等...',
  });
}

// 获取菜单列表
export function menuList(params?: AnyObj) {
  return request<Menu.Data[]>({
    url: '/api/menu/treeList',
    method: 'get',
    params,
  });
}
