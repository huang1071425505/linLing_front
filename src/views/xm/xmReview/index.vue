<template>
    <div>
        <el-select v-model="search.examineState" @change="handleSearch">
             <el-option label="未评论" value="0"></el-option>
             <el-option label="已评论" value="1"></el-option>
        </el-select>
        <el-input placeholder="项目名称..." v-model="search.projectName" class="searchInput"></el-input>
        <el-button style="margin-left:10px" type="primary" icon="el-icon-search" size="small" @click="handleSearch">搜索</el-button>
        <div class="tabel">
            <el-table ref="table" header-row-class-name="table-header-row" cell-class-name="cell-row" :data="tableData" border stripe fit highlight-current-row v-loading="listLoading" element-loading-text="正在加载中……">
                <el-table-column align="center" label="序号" type="index" :index="indexMethod" width="65"></el-table-column>
                <el-table-column align="center" prop="projectCode" label="项目编号"  min-width="90"></el-table-column>
                <el-table-column align="center" prop="projectName" label="项目名称"  min-width="90"></el-table-column>
                <el-table-column align="center" prop="projectStudentName" label="申报学生"  min-width="90"></el-table-column>
                <el-table-column align="center" prop="dicName" label="项目所属领域"  min-width="90"></el-table-column>
                <el-table-column align="center" prop="projectYear" label="年度"  min-width="90"></el-table-column>
                <el-table-column align="center" prop="createDate" label="创建时间"  min-width="90">
                    <template slot-scope="scope">
                        <div v-if="scope.row.createDate!=null&&scope.row.createDate!=''">
                            {{$moment(scope.row.createDate).format("YYYY-MM-DD")}}
                        </div>
                        <div v-else ></div>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="projectState" label="项目状态"  min-width="90">
                    <template slot-scope="scope">
                        {{stateShow(scope.row.projectState)}}
                    </template>
                                        
                </el-table-column>
                <el-table-column align="center" label="操作"  min-width="150">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.examineState=='0'" type="text" @click="review(scope.row)" icon="el-icon-edit">评审</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="pagination" @current-change="handleClick" @size-change="handleSizeChange" :current-page="pageProperty.page" :page-sizes="[10, 20, 50]" layout="total, sizes, prev, pager, next, jumper" :total="pageProperty.totalElements"></el-pagination>
        </div>
        <review ref="review" v-on:loadData="getDataList"></review>
    </div>
</template>
<script>
import fetch from '@/utils/fetch'
import { Loading } from "element-ui"
import { Message } from 'element-ui';

import review from './review';
export default {
    components:{
        review,
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
                examineState:"0",
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
                fetch.post("/api/xmProjectExamine/page",this.pageProperty,
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
        },
        review(r){
            this.$refs.review.init(r);
        },
    }
    
}
</script>
<style scoped>

</style>
