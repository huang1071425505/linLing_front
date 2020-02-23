// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//日期格式
import Moment from 'vue-moment'

//检测是否需要登录
import "./utils/permission";

//全局样式
import "./style/main.css";
//字体样式
import "./style/font.css";

//全局变量
import store from '@/store';
Vue.prototype.$store=store;

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
