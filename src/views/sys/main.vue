<template>
    <div>
        <el-container>
            <el-aside width="250px" :style="asideStyle">
                <el-menu  class="el-menu-vertical-demo" :default-active="activeIndex" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                    <div v-for="(item,index) in menuData" :key="index">
                        <div v-if="item.children!=undefined">
                            <el-submenu  :index="index+''">
                                <template slot="title">
                                    <i :class="item.menuIcon"></i>
                                    <span slot="title">{{item.menuName}}</span>
                                </template>
                                <div v-for="(item1,index1) in item.children" :key="index1">
                                    <div v-if="item1.children!=undefined">
                                        <el-submenu  :index="index+'-'+index1">
                                            <template slot="title">
                                                <i :class="item.menuIcon"></i>
                                                <span slot="title">{{item1.menuName}}</span>
                                            </template>
                                            <div v-for="(item2,index2) in item.children" :key="index2">
                                                <el-menu-item :index="index+'-'+index1+'-'+index2" @click="card(index+'-'+index1+'-'+index2,item2.menuUrl,item2.menuName)">
                                                    <i :class="item2.menuIcon" ></i>
                                                    <span slot="title">{{item2.menuName}}</span>
                                                </el-menu-item>
                                            </div>
                                        </el-submenu>
                                    </div>
                                    <div v-else>
                                        <el-menu-item :index="index+'-'+index1" @click="card(index+'-'+index1,item1.menuUrl,item1.menuName)">
                                            <i :class="item1.menuIcon" ></i>
                                            <span slot="title">{{item1.menuName}}</span>
                                        </el-menu-item>
                                    </div>
                                </div>
                            </el-submenu>
                        </div>
                        <div v-else>
                            <el-menu-item :index="index+''" @click="card(index,item.menuUrl,item.menuName)">
                                <i :class="item.menuIcon" ></i>
                                <span slot="title">{{item.menuName}}</span>
                            </el-menu-item>
                        </div>
                    </div>
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
import fetch from '@/utils/fetch'
import { Message } from 'element-ui';

import {toTree} from '@/utils/comment'
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
            activeIndex:"",
            menuData:[],
        }
    },
    created(){
        this.userInfo=this.$store.state;
        this.asideStyle="height:"+document.documentElement.clientHeight+"px";
        this.mainStyle="height:"+(document.documentElement.clientHeight*0.8)+"px";
        this.getMenuPermissions();
    },
    methods:{
        //获取菜单权限
        getMenuPermissions(){
            fetch.get("api/sysMenu/menuPermissions").then(res=>{
                if(res.code=="0"){
                    this.menuData=toTree(res.data,0,"id","menuName","menuPid")
                    console.log(this.menuData)
                }
            })
        },
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
    height: 100%;
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
