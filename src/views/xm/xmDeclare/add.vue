<template>
    <div>
        <el-dialog  title="新增" :visible.sync="visible" v-if="visible" width="1050px" :close-on-click-modal="false" @close="closeDialog">
            <el-form ref="form" :rules="rules" :model="formData" label-width="120px" label-position="right">               
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="项目编号:" prop="projectCode">
                            <el-input  placeholder="项目编号" v-model="formData.projectCode" number></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="项目名称:" prop="projectName">
                            <el-input  placeholder="项目名称" v-model="formData.projectName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="年度:" prop="projectYear">
                            <el-date-picker style="width:385px;" type="year" placeholder="选择年度" v-model="formData.projectYear"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="项目所属领域:" prop="projectField">
                            <!-- <el-input  placeholder="项目所属领域" v-model="formData.projectField"></el-input> -->
                            <el-select  placeholder="项目所属领域"  filterable v-model="formData.projectField" style="width:385px;" @change="projectFieldChange">
                                <el-option v-for="item in projectFieldList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="指导教师:" prop="projectTeacherId">
                            <el-select  placeholder="指导教师"  filterable v-model="formData.projectTeacherId" style="width:385px;" @change="selectChange">
                                <el-option v-for="item in teacherList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="项目经费:" prop="projectFunds">
                            <el-input-number v-model="formData.projectFunds"  :min="0" :max="1000000" placeholder="项目经费"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="项目介绍:" prop="projectIntroduce">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"  placeholder="项目介绍" v-model="formData.projectIntroduce"></el-input>
                </el-form-item>
                <el-form-item label="备注:" prop="projectRemark">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"  placeholder="备注" v-model="formData.projectRemark"></el-input>
                </el-form-item>
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
import { Message } from 'element-ui';
export default {
    data(){
        return{
            formData:{
                projectCode:"",
                projectName:"",
                projectYear:"",
                projectField:"",
                projectTeacherId:null,
                projectFunds:"",
                projectIntroduce:"",
                projectRemark:"",
            },
            rules:{
                projectCode:[{required:true,message:'项目编号不能为空'},
                                { pattern: /^[a-z0-9]+$/, message: "请输入数字" },
                             { validator: YzProjectCode, trigger: 'blur' }],
                projectName:[{required:true,message:'项目名称不能为空'}],
                projectYear:[{required:true,message:'年度不能为空'}],
                projectField:[{required:true,message:'所属领域不能为空'}],
                projectTeacherId:[{required:true,message:'指导教师不能为空',trigger:'blur'}],
                projectFunds:[{required:true,message:'经费不能为空'}],
                projectIntroduce:[{required:true,message:'项目介绍不能为空'}],
            },
            teacherList:[],
            projectFieldList:[],
            visible:false,  
        }
        function YzProjectCode(rule, value, callback){
            fetch.get("/api/xmProject/yzProjectCode/"+value).then(res => {
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
            this.getTeacherList();
            this.getProjectFieldList();
        },
        //获取指导老师列表
        getTeacherList(){
            fetch.get("/api/sysUsers/roleList/2").then(res => {
                if(res.code=="0"){
                    this.teacherList=[];
                    for(var index in res.data){
                        this.teacherList.push({
                            label:res.data[index].userName,
                            value:res.data[index].userId
                        })
                    }
                }
            })
        },
        //获取项目所属领域列表
        getProjectFieldList(){
            fetch.get("/api/sysdictionary/groupQuery/xmssly").then(res => {
                if(res.code=="0"){
                    this.projectFieldList=[];
                    for(var index in res.data){
                        this.projectFieldList.push({
                            label:res.data[index].dicName,
                            value:res.data[index].id
                        })
                    }
                }
            })
        },
        //项目所属领域选择变动事件
        projectFieldChange(){

        },
        //下拉框选择变动事件
        selectChange(r){
            for(var index in this.teacherList){
                if(this.teacherList[index].value==r){
                    this.formData.projectTeacherName=this.teacherList[index].label;
                }
            }
        },
        save(form){
            this.$refs[form].validate(valid => {
                if (valid) {
                    this.formData.projectYear=this.$moment( this.formData.projectYear).format("YYYY")
                    fetch.post("/api/xmProject/save",this.formData).then(res => {
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
        closeDialog(){
            this.visible=false;
            // 清空验证
            this.$refs['form'].clearValidate();
            this.formData={
                projectCode:"",
                projectName:"",
                projectYear:"",
                projectField:"",
                projectTeacherId:null,
                projectFunds:"",
                projectIntroduce:"",
                projectRemark:"",
                acceptanceOpinion:"",
            }
        },
    }
}
</script>
<style scoped>
</style>
