<template>
    <div>
    <h1>111111111111111</h1>
    <el-button type="warning" @click="ceshi">测试</el-button>
    <div v-if="userName!=''">{{userName}} is pig</div>

    <el-input  v-model="userCode" placeholder="用户"></el-input>
    <el-input v-model="password" placeholder="密码"></el-input>
    <el-button type="warning" @click="login">测试登录</el-button>
    
    </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
    data(){
        return{
            userName:"",
            token:"",
            userCode:"123",
            password:"123456"
        }
    },
    methods:{
        ceshi(){
            axios.get("/api/sysUsers/myInfo",
            {
            headers: {
                token:this.token
            },
        }).then(res=>{
                this.userName=res.data.data[0].userName
            })
        },
        login(){
            let postData = qs.stringify({
                userCode:this.userCode,
                password:this.userCode
            })
            axios.post("/api/sysUsers/login",
            postData).then(res=>{
                this.token=res.data.msg;
            })
        }
    }

}
</script>

<style>

</style>
