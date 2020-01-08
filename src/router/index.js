import Vue from 'vue'
import Router from 'vue-router'
import main from '@/views/sys/main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      // 主页
      path: '/',
      name: 'HelloWorld',
      component: main
    }
  ]
})
