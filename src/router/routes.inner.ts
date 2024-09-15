import type { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'root',
    redirect: '/appRoot',
    children: [],
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      isWithoutTab: true,
    },
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/404',
    name: '404',
    meta: {
      title: '找不到页面',
      icon: 'icon-park-outline:ghost',
    },
    component: () => import('@/views/error/404/index.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    meta: {
      title: '找不到页面',
      icon: 'icon-park-outline:ghost',
    },
    component: () => import('@/views/error/404/index.vue'),
  },
];
