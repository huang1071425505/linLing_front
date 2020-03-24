<template>
    <div class="loginContainer" :style="{ 'background': 'url(static/image/sys/back.gif) no-repeat center center', 'background-size': '100% 100%'}">
        <div class="loginTitie">双创项目管理系统</div>
        <el-form class="loginForm" ref="loginForm" :model="form" :rules="rules" label-position="left">
            <el-form-item prop="userCode" class="loginElement">
                <el-input  prefix-icon="iconfont zhanghao" class="loginInput" v-model="form.userCode"  type="text"  placeholder="请输入账号" ></el-input>
            </el-form-item>
            <el-form-item prop="password" class="loginElement">
                <el-input prefix-icon="iconfont mima" class="loginInput" v-model="form.password"  :type="passw"   placeholder="请输入密码" @keyup.enter="login" >
                    <i slot="suffix" v-if="!eyes" @click="showPassword()" class="iconfont eye"></i>
                    <i slot="suffix" v-else @click="showPassword()" class="iconfont close-eye"></i>
                </el-input>
            </el-form-item>
            <el-button  type="primary" @click="login">登录</el-button>
        </el-form>
    </div>
</template>

<script>
import { Message } from 'element-ui';
import {
    getToken,
  } from '@/utils/cookies'
export default {
    data(){
        return{
            eyes:'false',
            passw:'password',
            userName:"",
            rules:{},
            form:{
                userCode:"123",
                password:"123456"
            }
        }
    },
    mounted(){
    },
    methods:{
        //登录
        login(){
            this.$store.dispatch('login', this.form).then(res => {
                console.log(res.code)
                if (res.code == "0") {
                    this.$router.push("/")
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
        },
        //点击图标  密码显示隐藏 切换
	showPassword(){ /*密码显示 */
		if (this.eyes) {
		    this.eyes = false;
		    this.passw = 'text';
		}else {
		    this.eyes = true;
		    this.passw = 'password';
		}
	} 
    },

    

}
</script>

<style scoped>
    .loginTitie {
        position: absolute;
        left: 0;
        padding-left: 25%;
        margin: 37vh auto 0 auto;
        font-size:50px
    }
    .loginContainer {
    position: relative;
    height: 100vh;
    width: 100%;
    min-width: 950px;
    background-color: lightblue;
    overflow: hidden;
    }
    .iconfont{
        width: 25px;
        height: 25px;
        font-size: 18px;
        vertical-align: center;
        color: darkgray;
    }
    .eye{
        width: 35px;
        height: 35px;
        font-size: 25px;
    }
    .close-eye {
        margin-right: 5px;
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
    height: 45px;
    margin: 0 3% 55px 3%;
    position: relative;
    }
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
    border: 0;
    border-radius: 5px;
    font-size: 15px;
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
