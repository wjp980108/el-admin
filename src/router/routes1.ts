import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/index.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Main',
    meta: { title: '首页' },
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
      },
    ],
  },
  {
    path: '/settings',
    name: 'settings',
    meta: { title: '设置中心' },
    component: Layout,
    children: [
      {
        path: 'mechanism',
        name: 'mechanism',
        component: () => import('@/views/settings/mechanism/index.vue'),
      },
    ],
  },
]
