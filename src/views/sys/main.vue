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
import { Message } from 'element-ui';
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
            let postData = qs.stringify({
                userCode:this.userCode,
                password:this.userCode
            })
            axios.post("/api/sysUsers/login",
            postData).then(res=>{
                if(res.data.code=="0"){
                    this.token=res.data.msg;
                    this.$message({
                        message: '登录成功',
                        type: 'success'
                    });
                }else{
                    this.$message({
                        type: 'error',
                        message: '登录失败!'
                    });
                }
            })
        }
    }

}
</script>

<style>

</style>
