import Vue from 'vue'
import Router from 'vue-router'
// import main from '@/views/sys/main'
const _import = file => () => import('@/views/' + file)
Vue.use(Router)


export const childrenMap = [
  {
    // 用户管理
    path: 'sysUser',
    name: 'sysUser',
    component: _import('sys/sysUser.vue'),
  },
  {
    // 角色管理
    path: 'sysRole',
    name: 'sysRole',
    component: _import('sys/sysRole/index'),
  },
]
export default new Router({
  mode: 'history',
  routes: [
    {
      // 主页
      path: '/',
      name: 'HelloWorld',
      component: _import('sys/main.vue'),
      children: childrenMap
    },
    {
      // 登录页
      path: '/login',
      name: 'login',
      component: _import('sys/login.vue'),
    }
  ]
})
