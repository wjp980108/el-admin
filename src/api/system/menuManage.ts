import request from '@/utils/axios';

// 获取菜单列表
export function menuList(params?: Menu.Params) {
  return request<Menu.Data[]>({
    url: '/api/menu/list',
    method: 'get',
    params,
  });
}

// 新增菜单
export function createMenu(data: Menu.Data) {
  return request({
    url: '/api/menu/create',
    method: 'post',
    data,
  }, {
    loading: true,
    loadingText: '保存中，请稍等...',
  });
}

// 编辑菜单
export function editMenu(data: Menu.Data) {
  return request({
    url: '/api/menu/update',
    method: 'post',
    data,
  }, {
    loading: true,
    loadingText: '保存中，请稍等...',
  });
}

// 删除菜单
export function deleteMenu(id: string) {
  return request({
    url: '/api/menu/delete',
    method: 'post',
    data: {
      id,
    },
  }, {
    loading: true,
    loadingText: '删除中，请稍等...',
  });
}

// 设置菜单状态
export function upMenuStatus(data: { id: string, isEnabled: boolean }) {
  return request({
    url: '/api/menu/updateEnabled',
    method: 'post',
    data,
  }, {
    loading: true,
    loadingText: '更新中，请稍等...',
  });
}
