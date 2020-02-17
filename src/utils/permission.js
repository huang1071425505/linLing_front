import router from '@/router'
import {
    getToken,
  } from '@/utils/cookies'

  //设置白名单
  const whiteList = ['/login']
  // 路由判断登录
  router.beforeEach((to, from, next) => {
    if (getToken()) {
        //如果已经登录
        if (to.path === '/login') {
            next('/')
        } else {
            next();
        }
    }else if (whiteList.indexOf(to.path) !== -1) {
        //如果前往的路径是白名单内的,就可以直接前往
        next();
    }else {
        next('/login')
    }
  })