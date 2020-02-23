import Vue from 'vue'
import Vuex from 'vuex'
import {
	setToken,
	removeToken
  } from '@/utils/cookies'
import fetch from '@/utils/fetch'

Vue.use(Vuex)

const store = new Vuex.Store({ //全局变量定义
	state: {
		forcedLogin: false, //是否需要强制登录
		hasLogin: false, //是否在线
		userCode: "", //用户编号
		userId: "", //用户ID
		userName: "", //用户名
		userJob:"",//用户工作
		userTel:"",//用户电话号
		userAvatar:"",//用户头像
		userDwid: "", //用户单位Id
		userDwname: "", //用户单位Name
		userBmid: "", //用户部门Id
		userBmname: "", //用户部门Name
	},
	getters: {
			getUserName: state => state.userName
	},
	mutations: {
		login(state, user) {
			state.hasLogin = true;
			state.userCode = user.userCode;
			state.userId = user.userId;
			state.userName = user.userName;
		},
		logout(state) {
			state.hasLogin = false;
			state.userCode = "";
			state.userId = "";
			state.userName = "";
			state.userJob = "";
			state.userTel = "";
			state.userAvatar = "";
			state.userDwid = "";
			state.userDwname = "";
			state.userBmid = "";
			state.userBmname = "";
    },
			getInfo(){

			}
    },
    actions: {
        //登录
        login({ commit },form){
					return new Promise((resolve) => {
						fetch.post("/api/sysUsers/login",{
							userCode:form.userCode,
							password:form.password
						}).then(res=>{
							if(res.code=="0"){
								setToken(res.msg);
								commit('login',res.data);
							}
							resolve(res);
						}).catch(() => {
						})
					})
        },
        //登出
        logout({ commit }){
					return new Promise((resolve) => {
						fetch.get("/api/sysUsers/logout")
							.then(res => {
								commit('logout')
								removeToken();
								resolve(res);
							}).catch(() => {
							})
						})
        },
        //获取当前用户信息
        getInfo({ commit }){
					return new Promise((resolve) => {
						fetch.get("/api/sysUsers/myInfo").then(res => {
							commit('getInfo')
							resolve(res);
						}).catch(() => {
						});
						})
			
        }
    }
})
export default store
