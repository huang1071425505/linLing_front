<template>
    <div>
        <el-input placeholder="课程名称..." v-model="search.courseName" class="searchInput"></el-input>
        <el-button style="margin-left:10px" type="primary" icon="el-icon-search" size="small" @click="handleSearch">搜索</el-button>
        <div class="add">
            <el-button style="margin-left:10px" type="primary" icon="el-icon-plus" size="small" @click="addDialog()">新增</el-button>
        </div>
        <div class="tabel">
            <el-table ref="table" header-row-class-name="table-header-row" cell-class-name="cell-row" :data="tableData" border stripe fit highlight-current-row v-loading="listLoading" element-loading-text="正在加载中……">
                <el-table-column align="center" label="序号" type="index" :index="indexMethod" width="65"></el-table-column>
                <el-table-column align="center" prop="courseName" label="课程名称"  min-width="90"></el-table-column>
                <el-table-column align="center" prop="userName" label="任课老师"  min-width="90"></el-table-column>
                <el-table-column align="center" prop="courseDate" label="上课时间"  min-width="90">
                    <template slot-scope="scope">
                        <div v-if="scope.row.courseDate!=null&&scope.row.courseDate!=''">
                            {{$moment(scope.row.courseDate).format("YYYY-MM-DD HH:mm:ss")}}
                        </div>
                        <div v-else ></div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作"  min-width="150">
                    <template slot-scope="scope">
                        <el-button type="text" @click="seeDialog(scope.row)" icon="el-icon-tickets">查看</el-button>
                        <el-button type="text" @click="exitDialog(scope.row)" icon="el-icon-edit">修改</el-button>
                        <el-button type="text" @click="delDialog(scope.row)" icon="el-icon-warning">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="pagination" @current-change="handleClick" @size-change="handleSizeChange" :current-page="pageProperty.page" :page-sizes="[10, 20, 50]" layout="total, sizes, prev, pager, next, jumper" :total="pageProperty.totalElements"></el-pagination>
        </div>
        <add ref="add" v-on:loadData="getDataList"></add>
        <exit ref="exit" v-on:loadData="getDataList"></exit>
        <see ref="see" v-on:loadData="getDataList"></see>
    </div>
</template>
<script>
import fetch from '@/utils/fetch'
import { Loading } from "element-ui"
import { Message } from 'element-ui';

import add from './add'
import exit from './exit'
import see from './see'
export default {
    components:{
        add,
        exit,
        see
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
                courseName:"",
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
                fetch.post("/api/scCourse/page",this.pageProperty,
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
        exitDialog(r){
            this.$refs.exit.init(r);
        },
        delDialog(r){
            this.$confirm("是否删除该课程", "提示", {
                type: "warning",
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            }).then(() => {
                fetch.get("/api/scCourse/state/" + r.id).then(res => {
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
        addDialog(){
            this.$refs.add.init();
        },
        seeDialog(r){
            this.$refs.see.init(r);
        }
    }
    
}
</script>
<style scoped>

</style>
