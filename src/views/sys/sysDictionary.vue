<template>
    <div>
        <el-container>
        <el-aside width="200px">
            <el-tree :data="treeData" @node-click="handleNodeClick"></el-tree>
        </el-aside>
        <el-main>
            <div v-if="show">
                <el-form ref="form" :rules="rules" :model="formData" label-width="100px" label-position="right">
                    <el-form-item label="code" prop="dicCode">
                        <el-input placeholder="code" v-model="formData.dicCode" ></el-input>
                    </el-form-item >
                    <el-form-item label="名称" prop="dicName">
                        <el-input placeholder="名称" v-model="formData.dicName" ></el-input>
                    </el-form-item >
                    <el-form-item label="组：" prop="dicGroup">
                        <el-input placeholder="组" v-model="formData.dicGroup" ></el-input>
                    </el-form-item >
                    <el-form-item label="值：" prop="dicValue">
                        <el-input placeholder="值" v-model="formData.dicValue" ></el-input>
                    </el-form-item >
                    <el-form-item label="排序：" prop="dicOrder">
                        <el-slider v-model="formData.dicOrder" :max="50"></el-slider>
                    </el-form-item >
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="add('添加同级')">添加同级</el-button>
                    <el-button type="primary" @click="add('添加下级')">添加下级</el-button>
                    <el-button type="primary" @click="save">保存信息</el-button>
                    <el-button type="primary" @click="delDialog">删除菜单</el-button>
                </div>
            </div>
        </el-main>
        </el-container>
    </div>
</template>

<script>
import fetch from '@/utils/fetch'
import { Message } from 'element-ui'
import {toTree} from '@/utils/comment'

export default {
    components:{
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
            fetch.get("/api/sysdictionary/dictionaryList").then(res=>{
                if(res.code=="0"){
                    this.treeData=toTree(res.data,0,"id","dicName","dicPid")
                }
            })
        },
        handleNodeClick(data) {
            this.show=true;
            this.formData=data;
        },
        save(){
            fetch.post("/api/sysdictionary/save",this.formData).then(res => {
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
                    dicPid:this.formData.dicPid,
                    dicOrder:this.formData.dicOrder,
                }
                this.formData=data;
            }else{
                var data={
                    dicPid:this.formData.id,
                    dicOrder:this.formData.dicOrder,
                }
                this.formData=data;
            }

        },
        delDialog(){
            fetch.get("/api/sysdictionary/state/"+this.formData.id).then(res => {
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
