<template>
    <div>
        <el-container>
            <el-aside width="250px" :style="asideStyle">
                <el-menu  class="el-menu-vertical-demo" :default-active="activeIndex" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                    <el-submenu index="1">
                        <template slot="title">
                        <i class="iconfont zhanghaoguanli"></i>
                        <span slot="title">账号管理</span>
                        </template>
                        <el-menu-item index="1-1" @click="card('1-1','sysUser','系统用户')">系统用户</el-menu-item>
                        <el-menu-item index="1-2" @click="card('1-2','sysRole','角色管理')">角色管理</el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span slot="title">项目管理</span>
                        </template>
                        <el-menu-item index="2-1" @click="card('2-1','xmDeclare','项目申报')">项目申报</el-menu-item>
                        <el-menu-item index="2-2" @click="card('2-2','xmDistribute','评审专家分配')">评审专家分配</el-menu-item>
                        <el-menu-item index="2-3" @click="card('2-3','xmReview','项目评审')">项目评审</el-menu-item>
                        <el-menu-item index="2-4" @click="card('2-4','xmApproval','项目立项')">项目立项</el-menu-item>
                        <el-menu-item index="2-5" @click="card('2-5','xmProgress','项目进展')">项目进展</el-menu-item>
                        <el-menu-item index="2-6" @click="card('2-6','xmGuidance','指导记录')">指导记录</el-menu-item>
                        <el-menu-item index="2-7" @click="card('2-7','xmConclud','项目结题')">项目结题</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="3">
                        <i class="el-icon-document"></i>
                        <span slot="title">项目过程</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-setting"></i>
                        <span slot="title">双创信息</span>
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
                                <el-dropdown-item command="changePassword">修改密码</el-dropdown-item>
                                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </el-header>
                <el-main :style="mainStyle">
                    <card ref="card" v-on:synchroData="synchroData"></card>
                </el-main>
                <el-footer></el-footer>
            </el-container>
        </el-container>
        <changePassword ref="changePassword"></changePassword>
    </div>
</template>

<script>
import { Message } from 'element-ui';
import card from './card';
import changePassword from './sysUser/changePassword';
export default {
    components:{
        card,
        changePassword
    },
    data(){
        return{
            isCollapse:false,
            clientHeight:0,
            asideStyle:"",
            mainStyle:"",
            userInfo:{},
            activeIndex:""
        }
    },
    created(){
        this.userInfo=this.$store.state;
        this.asideStyle="height:"+document.documentElement.clientHeight+"px";
        this.mainStyle="height:"+(document.documentElement.clientHeight*0.8)+"px";
    },
    methods:{
        card(index,url,title){
            this.$refs.card.addTab(index,url,title);
        },
        //菜单展开
        handleOpen(r){
        },
        //菜单隐藏
        handleClose(r){
        },
        //退出登录
        handleCommand(r){
            if(r=='changePassword'){
                this.$refs.changePassword.init();
            }else if(r=='logout'){
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
        },
        //数据同步
        synchroData(index){
            this.activeIndex=index;
        },
    }

}
</script>

<style scoped>

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .iconfont {
      width: 30px;
      height: 30px;
      font-size: 20px;
      margin-right: 5px;
      text-align: center;
      vertical-align: center;
  }

</style>
