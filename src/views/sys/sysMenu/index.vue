<template>
    <div>
        <el-container>
        <el-aside width="200px">
            <el-tree :data="treeData" @node-click="handleNodeClick"></el-tree>
        </el-aside>
        <el-main>
            <div v-if="show">
                <el-form ref="form" :rules="rules" :model="formData" label-width="100px" label-position="right">
                    <el-form-item label="菜单名称：" prop="menuName">
                        <el-input placeholder="菜单名称" v-model="formData.menuName" ></el-input>
                    </el-form-item >
                    <el-form-item label="菜单路径：" prop="menuUrl">
                        <el-input placeholder="菜单路径" v-model="formData.menuUrl" ></el-input>
                    </el-form-item >
                    <el-form-item label="菜单图标：" prop="menuIcon">
                        <el-input placeholder="菜单图标" v-model="formData.menuIcon" ></el-input>
                    </el-form-item >
                    <el-form-item label="菜单排序：" prop="menuOrder">
                        <el-slider v-model="formData.menuOrder" :max="50"></el-slider>
                    </el-form-item >
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="add('添加同级')">添加同级</el-button>
                    <el-button type="primary" @click="add('添加下级')">添加下级</el-button>
                    <el-button type="primary" @click="getMenuLimits()">菜单权限</el-button>
                    <el-button type="primary" @click="save">保存信息</el-button>
                    <el-button type="primary" @click="delDialog">删除菜单</el-button>
                </div>
            </div>
        </el-main>
        </el-container>
        <menuLimits ref="menuLimits"></menuLimits>
    </div>
</template>

<script>
import fetch from '@/utils/fetch'
import { Message } from 'element-ui'
import {toTree} from '@/utils/comment'

import menuLimits from './menuLimits'
export default {
    components:{
        menuLimits
    },
    data() {
        return {
            treeData:[],
            show:false,
            formData:{},
            rules:{}
        };
    },
    created(){
        this.getDataList();
    },
    methods: {
        getDataList(){
            fetch.get("/api/sysMenu/menuList").then(res=>{
                if(res.code=="0"){
                    this.treeData=toTree(res.data,0,"id","menuName","menuPid")
                }
            })
        },
        handleNodeClick(data) {
            this.show=true;
            this.formData=data;
        },
        getMenuLimits(){
            this.$refs.menuLimits.init(this.formData.id);
        },
        save(){
            fetch.post("/api/sysMenu/save",this.formData).then(res => {
                if (res.code == "0") {
                    Message({
                        message: res.msg,
                        type: "success",
                        duration: 3 * 1000
                    });
                    this.getDataList();
                    this.show=false;
                } else {
                    Message({
                        message: res.msg,
                        type: "error",
                        duration: 3 * 1000
                    });
                }
            })

        },
        add(r){
            if(r=="添加同级"){
                var data={
                    menuPid:this.formData.menuPid,
                    menuOrder:this.formData.menuOrder,
                }
                this.formData=data;
            }else{
                var data={
                    menuPid:this.formData.id,
                    menuOrder:this.formData.menuOrder,
                }
                this.formData=data;
            }

        },
        delDialog(){
            fetch.get("/api/sysMenu/state/"+this.formData.id).then(res => {
                if (res.code == "0") {
                    Message({
                        message: res.msg,
                        type: "success",
                        duration: 5 * 1000
                    });
                    this.getDataList();
                    this.show=false;
                } else {
                    Message({
                        message: res.msg,
                        type: "error",
                        duration: 5 * 1000
                    });
                }
            })
            
        }
    }

}
</script>

<style scoped>

</style>
