import axios from 'axios'
import qs from 'qs'
import {
    Message
} from 'element-ui'
import store from '@/store'
import router from '@/router'
import {
  getToken,
} from '@/utils/cookies'

// axios 配置
axios.defaults.timeout = 300000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

//请求拦截器
axios.interceptors.request.use(
    function (config) {
        if (config.method === 'post') {
            if (config.headers.post['Content-Type'] === 'application/x-www-form-urlencoded') {
              config.data = qs.stringify(config.data);
            }
        }
        config.headers['token']=getToken();
        return config;
    },
    function (error) {
        alert("错误的传参");
        return Promise.reject(error);
    }
  );
  
  //响应拦截器
  axios.interceptors.response.use(
    function (config) {
        return config.data;
    },
    function (error) {
        if (error.response.status == 504) {
            Message({
                message: '接口暂时不可用',
                type: 'error',
                duration: 5 * 1000
            })
        } else if (error.response.status == 404 || error.response.status == 405) {
            Message({
                message: '接口不存在',
                type: 'error',
                duration: 5 * 1000
            })
        }else if (error.response.status == 401) {
            store
              .dispatch("Logout")
              .then(res => {
                if (res.code == "0") {
                  if (store.getters.error401 == 0) {
                    router.push("/login?relogin=登录超时，请重新登录");
                  }
        
                } else {
                  Message({
                    message: res.msg,
                    type: "error",
                    duration: 5 * 1000
                  });
                }
              })
              .catch(error => {
                console.log(error);
              });
        } else {
          Message({
              message: error.response,
              type: 'error',
              duration: 5 * 1000
          })
        }
        return Promise.reject(error);
    }
  );
  export default axios