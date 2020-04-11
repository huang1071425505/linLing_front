<template>
    <div>
        <el-select v-model="search.userState" @change="handleSearch">
             <el-option label="所有" value=""></el-option>
             <el-option label="冻结" value="0"></el-option>
             <el-option label="正常" value="1"></el-option>
        </el-select>
        <el-input placeholder="查询" v-model="search.word" class="searchInput"></el-input>
        <el-button style="margin-left:10px" type="primary" icon="el-icon-search" size="small" @click="handleSearch">搜索</el-button>
        <div class="add">
            <el-button size="small" type="primary" icon="el-icon-plus"  @click="addDialog()">新增</el-button>
            <el-button size="small" type="success" icon="el-icon-refresh" @click="plStateDialog('1')">恢复</el-button>
            <el-button size="small" type="danger"  icon="el-icon-delete" @click="plStateDialog('0')">冻结</el-button>
        </div>
        <div class="tabel">
            <el-table ref="table" header-row-class-name="table-header-row" cell-class-name="cell-row" :data="tableData" border stripe fit highlight-current-row v-loading="listLoading" element-loading-text="正在加载中……" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column type="index" :index="indexMethod" width="50" align="center" label="序号"></el-table-column>
                <el-table-column  prop="userCode" label="账号"  min-width="100"  align="center"></el-table-column>
                <el-table-column prop="userName" label="姓名"   min-width="100" align="center"></el-table-column>
                <el-table-column prop="userPhone" label="联系电话" min-width="160" align="center"></el-table-column>
                <el-table-column prop="roleName" label="角色" min-width="100" align="center"></el-table-column>
                <el-table-column prop="userState" label="状态" min-width="50" align="center">
                    <template slot-scope="scope">
                        {{scope.row.userState=='1'?'正常':'冻结'}}
                    </template>
                </el-table-column>
                <el-table-column prop="userOperate" label="操作" min-width="150" align="center">
                    <template slot-scope="scope">
                        <el-button type="text"  icon="el-icon-tickets" @click="exitDialog(scope.row)">修改信息</el-button>
                        <el-button type="text"  :icon="scope.row.userState=='1'?'el-icon-delete':'el-icon-refresh'" @click="stateDialog(scope.row.userId,scope.row.userState)">{{scope.row.userState=='1'?'冻结':'恢复'}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 跳转页面 !-->
        <el-pagination class="pagination" @current-change="handleClick" :current-page="pageProperty.page" @size-change="handleSizeChange" :page-sizes="[10, 20, 50]" layout="total, sizes, prev, pager, next, jumper" :total="pageProperty.totalElements">
        </el-pagination>
        <add ref="add" v-on:loadData="getDataList"></add>
        <exit ref="exit" v-on:loadData="getDataList"></exit>
    </div>
            
</template>
<script>
import fetch from '@/utils/fetch'
import { Message } from 'element-ui'
import { Loading } from "element-ui"

import add from './add'
import exit from './exit'
export default {
    components:{
        add,
        exit
    },
    data(){
        return{
            tableData:[],
            // 页面相关
            pageProperty: {
                // 共多少条数据
                totalElements: 0,
                // 当前所在页
                page: 1,
                // 一页显示的条数
                size: 10,
                // 排序字段
                sort: "userId",
                // 排序方向
                dir: "desc",
                parameters:{}
            },
            search:{
                userState:"",
                word:"",
            },
            xzUserData:[],
        }
    },
    created(){
        this.getDataList();
    },
    methods:{
        getDataList(){
            return new Promise((resolve, reject) => {
                this.listLoading = true;
                this.pageProperty.parameters = this.search;
                fetch.post("/api/sysUsers/userList",this.pageProperty,
                    {
                        // 自定义头
                        headers: {
                            post: { "Content-Type": "application/json" }
                        }
                    }
                )
                .then(res => {
                    if (res.code == "0") {
                        this.tableData=res.data.rows;
                        //将总记录数传到pagination中
                        this.pageProperty.totalElements=res.data.counts;
                    } else {
                        Message({
                            message: res.msg,
                            type: "error",
                            duration: 5 * 1000
                        });
                    }
                    resolve(res);
                })
                .catch(error => {
                    reject(error);
                });
                this.listLoading = false;
            });
        },
        // 序号
        indexMethod(index) {
            return index + 1 + (this.pageProperty.page - 1) * this.pageProperty.size;
        },
        // 当前页改变时触发，获取所改变页的数据
        handleClick(page) {
            this.pageProperty.page = page;
            this.getDataList();
        },
        // 当前页显示数据条数改变时触发，重新获取数据
        handleSizeChange(size) {
            this.pageProperty.size = size;
            this.getDataList();
        },
        //搜索按钮点击时触发，重新获取数据
        handleSearch() {
            // 加载数据
            this.pageProperty.page = 1;
            this.getDataList();
        },
        addDialog() {
            this.$refs.add.init()
        },
        exitDialog(r){
            this.$refs.exit.init(r)

        },
        handleSelectionChange(r){
            this.xzUserData=r;
        },
        //批量状态操作
        plStateDialog(userState){
            if(this.xzUserData.length>0){
                var userIds=[];
                for(var index in this.xzUserData){
                    userIds.push(this.xzUserData[index].userId)
                }
                this.stateDialog(userIds.join(","),userState)
            }else{
                Message({
                    message:"请选择需要更改的用户",
                    type: "error",
                    duration: 5 * 1000
                });
            }
        },
        stateDialog(userId,userState){
            var title ="";
            if(userState=="1"){
                title="是否冻结用户";
            }else{
                title="是否恢复用户";
            }
            this.$confirm('是否进行此项操作', "提示", {
                type: "warning",
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            }).then(() => {
                fetch.get("/api/sysUsers/state/" +userId+"/"+userState).then(res => {
                    if (res.code == "0") {
                        Message({
                            message: res.msg,
                            type: "success",
                            duration: 5 * 1000
                        });
                        this.getDataList();
                    } else {
                        Message({
                            message: res.msg,
                            type: "error",
                            duration: 5 * 1000
                        });
                    }
                })
            })
        },
    }
    
    
}
</script>
<style scoped>
</style>