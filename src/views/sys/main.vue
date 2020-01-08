<template>
    <div>
    <h1>111111111111111</h1>
    <el-button type="warning" @click="ceshi">测试</el-button>
    <div v-if="userName!=''">{{userName}} is pig</div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            userName:""
        }
    },
    methods:{
        ceshi(){
            axios.get("/api/SysUsers/myInfo").then(res=>{
                this.userName=res.data.data[0].userName
            })
        }
    }

}
</script>

<style>

</style>
