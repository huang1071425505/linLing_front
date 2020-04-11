<template>
    <div>
        <el-dialog  title="新增用户" :visible.sync="visible" width="800px" :close-on-click-modal="false" @close='closeDialog'>
            <el-form ref="form" :rules="rules" :model="formData" label-width="100px" label-position="right">
                <el-form-item label="用户账号：" prop="userCode" >
                    <el-input placeholder="用户账号" v-model="formData.userCode" ></el-input>
                </el-form-item>
                <el-form-item label="用户姓名：" prop="userName" >
                    <el-input placeholder="用户姓名" v-model="formData.userName" ></el-input>
                </el-form-item>
                <el-form-item label="用户电话：" prop="userPhone">
                    <el-input placeholder="用户电话" v-model="formData.userPhone" ></el-input>
                </el-form-item >
                <el-form-item label="用户角色：" prop="roleId">
                    <el-select v-model="formData.roleId" @change="userRoleChange">
                        <el-option v-for="(item,index) in userRoleList" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <div v-if="formData.roleId!=null">
                    <div v-if="roleCode=='20200001'">
                        <el-form-item label="工作单位：" prop="workUnit" >
                            <el-input placeholder="工作单位" v-model="formData.workUnit" ></el-input>
                        </el-form-item>
                    </div>
                    <div v-if="roleCode=='20200002'||roleCode=='20200003'">
                        <el-row>
                            <el-col :span="12">
                                <div v-if="roleCode=='20200002'">
                                    <el-form-item label="教工号：" prop="jobNumber" >
                                        <el-input placeholder="教工号" v-model="formData.jobNumber" ></el-input>
                                    </el-form-item>
                                </div>
                                <div v-else>
                                    <el-form-item label="学号：" prop="jobNumber" >
                                        <el-input placeholder="学号" v-model="formData.jobNumber" ></el-input>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="院系：" prop="facultyAndDepartment">
                                    <el-input placeholder="院系" v-model="formData.facultyAndDepartment" ></el-input>
                                </el-form-item >
                            </el-col>
                        </el-row>
                    </div>
                    <div v-if="roleCode=='20200003'">
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="专业：" prop="major" >
                                    <el-input placeholder="专业" v-model="formData.major" ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="年级：" prop="grade">
                                    <el-input placeholder="年级" v-model="formData.grade" ></el-input>
                                </el-form-item >
                            </el-col>
                        </el-row>
                    </div>
                    <div v-if="roleCode=='20200001'||roleCode=='20200002'">
                         <el-row>
                            <el-col :span="12">
                                <el-form-item label="职称：" prop="occupation" >
                                    <el-input placeholder="职称" v-model="formData.occupation" ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="学位：" prop="academicDegree">
                                    <el-input placeholder="学位" v-model="formData.academicDegree" ></el-input>
                                </el-form-item >
                            </el-col>
                        </el-row>
                    </div>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="性别：" prop="sex" >
                                <el-input placeholder="性别" v-model="formData.sex" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="年龄：" prop="age">
                                <el-input placeholder="年龄" v-model="formData.age" ></el-input>
                            </el-form-item >
                        </el-col>
                    </el-row>
                    <el-form-item label="邮箱：" prop="email">
                        <el-input placeholder="邮箱" v-model="formData.email" ></el-input>
                    </el-form-item >
                    <el-form-item label="备注：" prop="remark">
                        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"  placeholder="备注" v-model="formData.remark"></el-input>
                    </el-form-item >
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取消</el-button>
                <el-button type="primary" @click="save('form')">新增</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import fetch from '@/utils/fetch'
import { Message } from 'element-ui'

import { isPhone,checkEmail } from '@/utils/validate.js'
export default {
    data(){
        return{
            formData:{
                userCode:"",
                userName:"",
                userPhone:"",
                roleId:null,
                jobNumber:"",
                facultyAndDepartment:"", 
                major:"", 
                grade:"", 
                workUnit:"", 
                occupation:"", 
                academicDegree:"", 
                sex:"", 
                age:"", 
                email:"", 
                remark:"",
                userDetails:"",
            },
            rules:{
                userCode: [{ required: true, message: '请输入用户编号'},
                            { pattern: /^[a-z0-9]+$/, message: "请输入数字" },
                            { validator: YzUserCode, trigger: 'blur' }],
                userName: [{ required: true, message: '请输入用户名称'}],
                userPhone: [{ required: true, message: '请输入用户电话'},
                            { validator: isPhone, trigger: 'blur' }],
                roleId: [{ required: true, message: '请选择用户角色'}],
                email:[{validator: checkEmail,trigger: 'blur'}],
            },
            visible:false,
            userRoleList:[],
            roleCode:"",
        }
        function YzUserCode(rule, value, callback){
            fetch.get("/api/sysUsers/yzUserCode/"+value).then(res => {
                if(res.code=="0"){
                    return callback()
                }else{
                    return callback(new Error('存在重复code'))
                }
            })

        }
    },
    methods:{
        init(){
            this.visible=true;
            this.roleList();
        },
        roleList(){
            fetch.get("/api/sysRole/effective").then(res => {
                if(res.code=="0"){
                    this.userRoleList=[];
                    for(var index in res.data){
                        this.userRoleList.push({
                            value:res.data[index].roleId,
                            label:res.data[index].roleName,
                            code:res.data[index].roleCode
                        })
                    }

                }
            })
        },
        save(form){
            this.formData.userDetails={};
            if(this.roleCode=='20200001'){
                this.formData.userDetails={
                    workUnit:this.formData.workUnit,
                    occupation:this.formData.occupation,
                    academicDegree:this.formData.academicDegree,
                    sex:this.formData.sex,
                    age:this.formData.age,
                    email:this.formData.email,
                    remark:this.formData.remark,
                }
            }else if(this.roleCode=='20200002'){
                this.formData.userDetails={
                    jobNumber:this.formData.jobNumber,
                    facultyAndDepartment:this.formData.facultyAndDepartment,
                    occupation:this.formData.occupation,
                    academicDegree:this.formData.academicDegree,
                    sex:this.formData.sex,
                    age:this.formData.age,
                    email:this.formData.email,
                    remark:this.formData.remark,
                }
            }else if(this.roleCode=='20200003'){
                this.formData.userDetails={
                    jobNumber:this.formData.jobNumber,
                    facultyAndDepartment:this.formData.facultyAndDepartment,
                    major:this.formData.major,
                    grade:this.formData.grade,
                    sex:this.formData.sex,
                    age:this.formData.age,
                    email:this.formData.email,
                    remark:this.formData.remark,
                }
            }
            this.formData.userDetails=JSON.stringify(this.formData.userDetails)
            this.$refs[form].validate(valid => {
                if (valid) {
                    this.formData.roleIds=this.formData.roleId+"";
                    fetch.post("/api/sysUsers/save",this.formData).then(res => {
                        if (res.code == "0") {
                            Message({
                                message: res.msg,
                                type: "success",
                                duration: 3 * 1000
                            });
                            // 更新信息
                            this.$emit("loadData");
                            this.closeDialog();
                        } else {
                            Message({
                                message: res.msg,
                                type: "error",
                                duration: 3 * 1000
                            });
                        }
                    })
                }
            })
        },
        userRoleChange(r){
            for(var index in this.userRoleList){
                if(r==this.userRoleList[index].value){
                    this.roleCode=this.userRoleList[index].code;
                    break;
                }
            }
        },
        closeDialog(){
            this.visible=false;
            this.formData={
                userId:null,
                userCode:"",
                userName:"",
                userPhone:"",
                roleId:null,
                jobNumber:"",
                facultyAndDepartment:"", 
                major:"", 
                grade:"", 
                workUnit:"", 
                occupation:"", 
                academicDegree:"", 
                sex:"", 
                age:"", 
                email:"", 
                remark:"",
                userDetails:"",
            };
        },
    }
}
</script>
<style scoped>

</style>
