<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import {
    setUserInfo,
    getUserInfo,
  } from '@/utils/cookies'
export default {
    created(){
        //在页面加载时读取getUserInfo里的状态信息
        if (getUserInfo() ) {
            this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(getUserInfo())))
        }
        this.$router.push("/")
        window.addEventListener('beforeunload',()=>{
            setUserInfo(JSON.stringify(this.$store.state))
        })
    },

}
</script>

<style>
/* 消除浏览器中的白边 */
    body{
        margin: 0;
        padding: 0;
    }
    /* table表头和内容列表线对齐 */
    body .el-table th.gutter {
        display: table-cell !important
    }
</style>
