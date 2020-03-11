<template>
    <div>
        <el-row type="flex" justify="space-between" style="width: 100%;margin-bottom:15px">
            <el-col :span="15">
            <el-input prefix-icon="iconfont sousuo" class="search id" placeholder="账号" type="text" v-model="idInput"></el-input>
            <el-input prefix-icon="iconfont sousuo" class="search name" placeholder="姓名" type="text" v-model="nameInput"></el-input>
            <el-button class="search-button" type="primary" icon="el-icon-search" size="small" style="height:35px;">搜索</el-button>
            </el-col>
            <el-col :span="5" style="margin-right:0px;">
            <el-button size="small" type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增</el-button>
            <el-button size="small" type="success" icon="el-icon-refresh">恢复</el-button>
            <el-button size="small" type="danger" icon="el-icon-warning" style="margin-right:0px;">冻结</el-button>
            </el-col>
        </el-row>
        <el-dialog title="新增用户" width="30%" :visible.sync="dialogFormVisible" @close="addDialogClose" :close-on-click-modal="false">
            <el-form :model="addUser" label-width="100px" ref="addUser">
            <el-form-item label="账号：" prop="userCode" :required="true">
                <el-input class="dialogInput" v-model="addUser.userCode" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="姓名：" prop="userName" :required="true">
                <el-input class="dialogInput" v-model="addUser.userName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="userPassword" :required="true">
                <el-input class="dialogInput" v-model="addUser.userPassword" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="院系：" prop="userDepartment">
                <el-input class="dialogInput" v-model="addUser.userDepartment" auto-complete="off"></el-input>
            </el-form-item><el-form-item label="电话：" prop="userPhone">
                <el-input class="dialogInput" v-model="addUser.userPhone" auto-complete="off"></el-input>
            </el-form-item >
            <el-row>
                <el-col :span="5">
                    <el-form-item label="角色：" prop="userRole" :required="true" >
                        <el-select v-model="addUser.userRole" placeholder="请选择" style="width:100px;">
                            <el-option v-for="item in roleSelections" :label="item.label" :value="item.value" :key="item.value">{{item.label}}</el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="5"></el-col>
                <el-col :span="5">
                    <el-form-item label="状态：" prop="userState" :required="true">
                        <el-select v-model="addUser.userState" placeholder="请选择" style="width:100px;margin-left:100px">
                            <el-option v-for="item in stateSelections" :label="item.label" :value="item.value" :key="item.value">{{item.label}}</el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="备注：" prop="userNote">
                <el-input class="dialogInput" v-model="addUser.userNote" auto-complete="off"></el-input>
            </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" :index="indexMethod" width="50" align="center" label="序号"></el-table-column>
            <el-table-column  prop="userCode" label="账号"  align="center"></el-table-column>
            <el-table-column prop="userName" label="姓名" align="center"></el-table-column>
            <el-table-column prop="userPhone" label="联系电话" min-width="160" align="center"></el-table-column>
            <el-table-column prop="userDepartment" label="院系" min-width="180" align="center"></el-table-column>
            <el-table-column prop="userRole" label="角色" width="100" align="center"></el-table-column>
            <el-table-column prop="userNote" label="备注" min-width="180" align="center"></el-table-column>
            <el-table-column prop="userState" label="状态" width="50" align="center"></el-table-column>
            <el-table-column prop="userOperate" label="操作" min-width="180" align="center">
                <template slot-scope="tableData">
                    <el-button type="text" size="small" icon="el-icon-tickets">修改信息</el-button>
                    <el-button type="text" size="small" icon="el-icon-delete">删除用户</el-button>
                </template>
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
            dialogFormVisible:false,
            idInput:'',
            nameInput:'',
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
            addUser:{
                userCode:"",
                userName:"",
                userPassword:"",
                userRole:"",
                userState:"",
                userNote:"",
                userPhone:"",
                userDepartment:""
            },
            roleSelections:[
                {
                    value:'student',
                    label:'学生'
                },{
                    value:'teacher',
                    label:'教师'
                },{
                    value:'expert',
                    label:'专家'
                }
            ],
            stateSelections:[
                {
                    value:'enable',
                    label:'启用'
                },{
                    value:'disable',
                    label:'禁用'
                }
            ]
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
        // 清空dialog表单
        addDialogClose() {
            this.$refs.addUser.resetFields() // 清空表单
        },
    }
    
    
}
</script>
<style scoped>
    .iconfont{
        width: 25px;
        height: 25px;
        font-size: 18px;
        vertical-align: center;
        color: darkgray;
    }
    .search{
        width: 170px;
        height: 35px;
        line-height: 35px;
        font-size: 15px;
        text-align: center;
        margin-right: 10px;
    }
    .dialogInput{
        width:200px;
        font-size: 15px;
        text-align: center;
    }
    .el-dialog {
     display: flex;
     flex-direction: column;
     margin:0 !important;
     position:absolute;
     top:50%;
     left:50%;
     transform:translate(-50%,-50%);
     /*height:600px;*/
     max-height:calc(100% - 200px);
     max-width:calc(100% - 30px);
}
.el-dialog .el-dialog__body {
     flex:1;
     overflow: auto;
}
</style>