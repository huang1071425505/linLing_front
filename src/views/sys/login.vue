<template>
    <div class="loginContainer" >
        <el-form class="loginForm" ref="loginForm" :model="form" :rules="rules" label-position="left">
            <el-form-item prop="userCode" class="loginElement">
                <input  class="loginInput" v-model="form.userCode"  type="text"  placeholder="账号" />
            </el-form-item>
            <el-form-item prop="password" class="loginElement">
                <input class="loginInput" v-model="form.password"  type="password"   placeholder="密码" @keyup.enter="login" />
            </el-form-item>
            <el-button  type="primary" @click="login">登录</el-button>
        </el-form>
    </div>
</template>

<script>
import fetch from '@/utils/fetch.js';
import { Message } from 'element-ui';
import {
    getToken,
  } from '@/utils/cookies'
import store from '@/store';
export default {
    data(){
        return{
            userName:"",
            rules:{},
            form:{
                userCode:"123",
                password:"123456"
            },

        }
    },
    mounted(){
    },
    methods:{
        ceshi(){
            fetch.get("/api/sysUsers/myInfo").then(res=>{
                if(res.code=="0"){
                    this.userName=res.data.data[0].userName
                }else{
                    this.$message({
                        type: 'error',
                        message:res.msg
                    });
                }
            })
        },
        login(){
            store.dispatch('login', this.form).then(res => {
                if (res.code == "0") {
                    window.location.href = "/";
                    Message({
                        message: '登录成功',
                        type: 'success',
                        duration: 3 * 1000
                    });
                } else {
                    Message({
                        message: res.msg,
                        type: "error",
                        duration: 3 * 1000
                    });
                }
            });
            
        }
    }

}
</script>

<style scoped>
    .loginContainer {
    position: relative;
    height: 100vh;
    width: 100%;
    min-width: 950px;
    overflow: hidden;
    }
    .loginContainer .loginForm {
    position: absolute;
    right: 0;
    width: 50%;
    padding-left: 5%;
    margin: 30vh auto 0 auto;
    }
    .loginElement {
    width: 400px;
    margin: 0 3% 55px 3%;
    position: relative;
    } /* necessary to give position: relative to parent. */
    input[type="text"] {
    color: rgb(0, 0, 0);
    width: 100%;
    box-sizing: border-box;
    letter-spacing: 1px;
    }
    input[type="password"] {
    color: rgb(0, 0, 0);
    width: 100%;
    box-sizing: border-box;
    letter-spacing: 1px;
    }

    .loginInput {
    border: 1px solid #86bdce;
    transition: 0.4s;
    background: rgba(0, 0, 0, 0.1);
    z-index: 99;
    height: 45px;
    border: 0;
    }
    .el-form-item--medium .el-form-item__content,
    .el-form-item--medium .el-form-item__label {
    line-height: 1.15;
    }

    label {
    font-family: Microsoft YaHei;
    position: absolute;
    left: 60px;
    width: 40px;
    top: 3px;
    color: #fff;
    transition: 0.3s;
    z-index: 1;
    }
    .el-button--medium {
    width: 400px;
    margin: -10px 3% 0 3%;
    position: relative;
    }
    .el-button--primary {
    font-family: Microsoft YaHei;
    font-size: 15px;
    letter-spacing: 10px;
    background: #075e79;
    border: 0;
    height: 45px;
    }
</style>
