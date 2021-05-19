/*
 * @FilePath src/router/modules/setting.js
 * @Created Bay丶<baizhanying@autobio.com.cn> 2021-05-19 10:56:49
 * @Modified Bay丶<baizhanying@autobio.com.cn> 2021-05-19 11:29:25
 * @Description
 */

import Layout from '@/layout'

export default {
  path: '/setting',
  component: Layout,
  redirect: '/setting/user',
  name: '系统设置',
  meta: {
    title: '系统设置',
    icon: 'setting'
  },
  children: [
    {
      path: 'user',
      component: () => import('@/views/settings/user/index'), // Parent router-view
      name: '用户管理',
      meta: { title: '用户管理', icon: 'user', id: '1' }
    },
    {
      path: 'role',
      component: () => import('@/views/settings/role/index'), // Parent router-view
      name: '权限管理',
      meta: { title: '权限管理', icon: 'role', id: '2' }
    },
    {
      path: 'menu',
      component: () => import('@/views/settings/menu/index'), // Parent router-view
      name: '菜单管理',
      meta: { title: '菜单管理', icon: 'menu', id: '3' }
    }
  ]
}

