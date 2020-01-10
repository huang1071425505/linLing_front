<template>
    <div>
    <h1>111111111111111</h1>
    <el-button type="warning" @click="ceshi">测试</el-button>
    <div v-if="userName!=''">{{userName}} is pig</div>
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
            token:""
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
                    userCode:"123",
                password:"123456"
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
