// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//组件
import ElementUI from 'element-ui'
//日期格式
import Moment from 'vue-moment'





Vue.use(ElementUI, { size: 'medium' })
Vue.use(Moment)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
