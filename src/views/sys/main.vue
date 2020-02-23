<template>
    <div>
        <el-container>
            <el-aside width="250px" :style="asideStyle">
                <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                    <el-submenu index="1">
                        <template slot="title">
                        <i class="el-icon-location"></i>
                        <span slot="title">导航一</span>
                        </template>
                        <el-submenu index="1-4">
                        <span slot="title">选项4</span>
                        <el-menu-item index="1-4-1" @click="ceshi('sysUser','系统用户')">系统用户</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">导航二</span>
                    </el-menu-item>
                    <el-menu-item index="3" disabled>
                        <i class="el-icon-document"></i>
                        <span slot="title">导航三</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航四</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header>
                    <div class="right">
                        <span>{{userInfo.userName}}</span>
                        <el-dropdown  @command="handleCommand">
                            <img class="circleChart " src="static/image/sys/touxiang.jpg">
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </el-header>
                <el-main :style="mainStyle">
                    <card ref="card"></card>
                </el-main>
                <el-footer>Footer</el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import { Message } from 'element-ui';
import card from './card';
export default {
    components:{
        card
    },
    data(){
        return{
            isCollapse:false,
            clientHeight:0,
            asideStyle:"",
            mainStyle:"",
            userInfo:{}
        }
    },
    created(){
        this.userInfo=this.$store.state;
        this.asideStyle="height:"+document.documentElement.clientHeight+"px";
        this.mainStyle="height:"+(document.documentElement.clientHeight*0.8)+"px";
    },
    methods:{
        ceshi(url,title){
            this.$refs.card.addTab(url,title);
        },
        //菜单展开
        handleOpen(r){
        },
        //菜单隐藏
        handleClose(r){
        },
        //退出登录
        handleCommand(r){
            this.$store.dispatch('logout').then(res => {
                if (res.code == "0") {
                    window.location.href = "/login";
                    Message({
                        message: '登出成功',
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

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

</style>
