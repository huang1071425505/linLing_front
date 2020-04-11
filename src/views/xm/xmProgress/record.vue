<template>
    <el-dialog  title="进展记录" :visible.sync="visible" width="1050px" :close-on-click-modal="false" @close='closeDialog'>
            <div class="add">
                <el-button style="margin-left:10px" type="primary" icon="el-icon-plus" size="small" @click="addDialog()">新增</el-button>
            </div>
            <div class="tabel">
            <el-table ref="table" header-row-class-name="table-header-row" cell-class-name="cell-row" :data="tableData" border stripe fit highlight-current-row v-loading="listLoading" element-loading-text="正在加载中……">
                <el-table-column align="center" label="序号" type="index" :index="indexMethod" width="65"></el-table-column>
                <el-table-column align="center" prop="processRecord" label="进展记录"  min-width="90"></el-table-column>
                <el-table-column align="center" prop="recordDate" label="记录时间"  min-width="90">
                    <template slot-scope="scope">
                        <div v-if="scope.row.recordDate!=null&&scope.row.recordDate!=''">
                            {{$moment(scope.row.recordDate).format("YYYY-MM-DD")}}
                        </div>
                        <div v-else ></div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作"  min-width="150">
                    <template slot-scope="scope">
                        <el-button type="text" @click="delDialog(scope.row)" icon="el-icon-warning">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="pagination" @current-change="handleClick" @size-change="handleSizeChange" :current-page="pageProperty.page" :page-sizes="[10, 20, 50]" layout="total, sizes, prev, pager, next, jumper" :total="pageProperty.totalElements"></el-pagination>
        </div>
        <add ref="add" v-on:loadData="getDataList"></add>
    </el-dialog>
</template>

<script>
import fetch from '@/utils/fetch'
import { Loading } from "element-ui"
import { Message } from 'element-ui';

import add from './add'
export default {
    components:{
        add
    },
    data(){
        return{
            visible:false,
            //数据是否加载
            listLoading: false,
            tableData:[],
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
                projectId:"",
                recordType:"进展记录",
            },
        }
    },
    methods:{
        init(r){
            this.getDataList();
            this.search.projectId=r.id;
            this.visible=true;
        },
        getDataList(){
            return new Promise((resolve, reject) => {
                this.listLoading = true;
                this.pageProperty.parameters = this.search;
                fetch.post("/api/xmProjectProcess/page",this.pageProperty,
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
        addDialog(){
            this.$refs.add.init(this.search.projectId);
        },
        delDialog(r){
            this.$confirm("是否删除该进展", "提示", {
                type: "warning",
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            }).then(() => {
                fetch.get("/api/xmProjectProcess/state/" + r.id).then(res => {
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
        closeDialog(){
            this.visible=false;
        },
    }

}
</script>

<style>

</style>
