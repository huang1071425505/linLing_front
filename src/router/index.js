import Vue from 'vue'
import Router from 'vue-router'
// import main from '@/views/sys/main'
const _import = file => () => import('@/views/' + file)
Vue.use(Router)

// 解决router报错问题
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

export const childrenMap = [
  {
    // 用户管理
    path: 'sysUser',
    name: 'sysUser',
    component: _import('sys/sysUser/index'),
  },
  {
    // 角色管理
    path: 'sysRole',
    name: 'sysRole',
    component: _import('sys/sysRole/index'),
  },
  {
    // 菜单管理
    path: 'sysMenu',
    name: 'sysMenu',
    component: _import('sys/sysMenu/index'),
  },
  {
    // 项目申报
    path: 'xmDeclare',
    name: 'xmDeclare',
    component: _import('xm/xmDeclare/index'),
  },
  {
    // 评审专家分配
    path: 'xmDistribute',
    name: 'xmDistribute',
    component: _import('xm/xmDistribute/index'),
  },
  {
    // 项目评审
    path: 'xmReview',
    name: 'xmReview',
    component: _import('xm/xmReview/index'),
  },
  {
    // 项目立项
    path: 'xmApproval',
    name: 'xmApproval',
    component: _import('xm/xmApproval/index'),
  },
  {
    // 项目进展
    path: 'xmProgress',
    name: 'xmProgress',
    component: _import('xm/xmProgress/index'),
  },
  {
    // 指导记录
    path: 'xmGuidance',
    name: 'xmGuidance',
    component: _import('xm/xmGuidance/index'),
  },
  {
    // 项目结题
    path: 'xmConclud',
    name: 'xmConclud',
    component: _import('xm/xmConclud/index'),
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
