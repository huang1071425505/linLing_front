<template>
    <div>
        <el-input placeholder="项目名称..." v-model="search.projectName" class="searchInput"></el-input>
        <el-button style="margin-left:10px" type="primary" icon="el-icon-search" size="small" @click="handleSearch">搜索</el-button>
        <div class="add">
            <el-button style="margin-left:10px" type="primary" icon="el-icon-plus" size="small" @click="addDialog()">新增</el-button>
        </div>
        <div class="tabel">
            <el-table ref="table" header-row-class-name="table-header-row" cell-class-name="cell-row" :data="tableData" border stripe fit highlight-current-row v-loading="listLoading" element-loading-text="正在加载中……">
                <el-table-column align="center" label="序号" type="index" :index="indexMethod" width="65"></el-table-column>
                <el-table-column align="center" prop="projectCode" label="项目编号"  min-width="90"></el-table-column>
                <el-table-column align="center" prop="projectName" label="项目名称"  min-width="90"></el-table-column>
                <el-table-column align="center" prop="dicName" label="项目所属领域"  min-width="90"></el-table-column>
                <el-table-column align="center" prop="projectYear" label="年度"  min-width="90"></el-table-column>
                <el-table-column align="center" prop="projectState" label="项目状态"  min-width="90">
                    <template slot-scope="scope">
                        {{stateShow(scope.row.projectState)}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作"  min-width="150">
                    <template slot-scope="scope">
                        <el-button type="text" @click="detailsDialog(scope.row)" icon="el-icon-tickets">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="pagination" @current-change="handleClick" @size-change="handleSizeChange" :current-page="pageProperty.page" :page-sizes="[10, 20, 50]" layout="total, sizes, prev, pager, next, jumper" :total="pageProperty.totalElements"></el-pagination>
        </div>
        <add ref="add" v-on:loadData="getDataList"></add>
        <exit ref="exit" v-on:loadData="getDataList"></exit>
        <details1 ref="details1" v-on:loadData="getDataList"></details1>
    </div>
</template>
<script>
import fetch from '@/utils/fetch'
import { Loading } from "element-ui"
import { Message } from 'element-ui';

import add from './add'
import exit from './exit'
import details1 from './details'
export default {
    components:{
        add,
        exit,
        details1
    },
    data(){
        return{
            //数据是否加载
            listLoading: false,
            //页面相关
            pageProperty: {
                //共多少条数据
                totalElements: 0,
                //当前所在页
                page: 1,
                //一页显示的条数
                size: 10,
                //排序字段
                sort: "id",
                //排序方向
                dir: "desc",
                parameters: {}
            },
            search:{
                projectName:"",
                projectState:"",
                dqUser:"1"
            },
            tableData:[]
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
                fetch.post("/api/xmProject/page",this.pageProperty,
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
        //当前页改变时触发，获取所改变页的数据
        handleClick(page) {
            this.pageProperty.page = page;
            this.getDataList();
        },
        //当前页显示数据条数改变时触发，重新获取数据
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
        //序号
        indexMethod(index) {
            return index + 1 + (this.pageProperty.page - 1) * this.pageProperty.size;
        },
        //新增
        addDialog(){
            this.$refs.add.init();
        },
        //详情
        detailsDialog(r){
            console.log()
            this.$refs.details1.init(r);
        },
        //删除
        delDialog(r){
            this.$confirm("是否删除该项目", "提示", {
                type: "warning",
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            }).then(() => {
                fetch.get("/api/xmProject/state/" + r.id).then(res => {
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
        stateShow(projectState){
            if(projectState=="1"){
                return "待分配";
            }else if(projectState=="2"){
                return "待评审";
            }else if(projectState=="4"){
                return "待立项";
            }else if(projectState=="5"){
                return "项目进行中";
            }else if(projectState=="6"){
                return "项目结束";
            }else if(projectState=="7"){
                return "项目完成";
            }
        }
    }
    
}
</script>
<style scoped>

</style>
