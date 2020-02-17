<template>
    <div>
    <h1>111111111111111</h1>
    <el-button type="warning" @click="login">注销测试</el-button>
    </div>
</template>

<script>
import {
  removeToken,
} from '@/utils/cookies'
export default {
    methods:{
        login(){
            removeToken();
        }
    }

}
</script>

<style>

</style>
