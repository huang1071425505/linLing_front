<template>
    <div>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="index" :index="indexMethod" width="50"></el-table-column>
            <el-table-column  prop="userCode" label="账号" min-width="180">
            </el-table-column>
            <el-table-column prop="userName" label="姓名" min-width="180">
            </el-table-column>
        </el-table>
        <!-- 跳转页面 !-->
        <el-pagination class="pagination" @current-change="handleClick" :current-page="pageProperty.page" @size-change="handleSizeChange" :page-sizes="[10, 20, 50]" layout="total, sizes, prev, pager, next, jumper" :total="pageProperty.totalElements">
        </el-pagination>
    </div>
            
</template>
<script>
import fetch from '@/utils/fetch'
export default {
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
        }
    },
    created(){
        this.getUserList();
    },
    methods:{
        getUserList(){
            fetch.post("/api/sysUsers/userList",this.pageProperty,
            {
              // 自定义头
              headers: {
                post: { "Content-Type": "application/json" }
              }
            }).then(res => {
                if(res.code=="0"){
                    this.tableData=res.data.rows;
                    this.pageProperty.totalElements=res.data.counts;
                }
            })
        },
        // 序号
        indexMethod(index) {
            return index + 1 + (this.pageProperty.page - 1) * this.pageProperty.size;
        },
        // 当前页改变时触发，获取所改变页的数据
        handleClick(page) {
            this.pageProperty.page = page;
            this.getUserList();
        },
        // 当前页显示数据条数改变时触发，重新获取数据
        handleSizeChange(size) {
            this.pageProperty.size = size;
            this.getUserList();
        },
    }
    
    
}
</script>
<style scoped>
</style>