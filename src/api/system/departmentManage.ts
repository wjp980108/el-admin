import request from '@/utils/axios';

// 获取部门列表
export function deptList(params?: Department.Params) {
  return request<Department.Data[]>({
    url: '/api/department/list',
    method: 'get',
    params,
  });
}

// 新增菜单
export function createDept(data: Department.Data) {
  return request({
    url: '/api/department/create',
    method: 'post',
    data,
  }, {
    loading: true,
    loadingText: '保存中，请稍等...',
  });
}

// 编辑菜单
export function editDept(data: Department.Data) {
  return request({
    url: '/api/department/update',
    method: 'post',
    data,
  }, {
    loading: true,
    loadingText: '保存中，请稍等...',
  });
}

// 删除部门
export function deleteDept(id: string) {
  return request({
    url: '/api/department/delete',
    method: 'post',
    data: {
      id,
    },
  }, {
    loading: true,
    loadingText: '删除中，请稍等...',
  });
}

// 设置部门状态
export function upDeptStatus(data: { id: string, isEnabled: boolean }) {
  return request({
    url: '/api/department/updateEnabled',
    method: 'post',
    data,
  }, {
    loading: true,
    loadingText: '更新中，请稍等...',
  });
}
