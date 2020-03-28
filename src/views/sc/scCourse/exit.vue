<template>
    <div>
        <el-dialog  title="修改" :visible.sync="visible" width="1050px" :close-on-click-modal="false" @close='closeDialog'>
            <el-form ref="form" :rules="rules" :model="formData" label-width="100px" label-position="right">
                
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="课程名称:" prop="courseName">
                            <el-input  placeholder="课程名称" v-model="formData.courseName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="任课老师:" prop="userId">
                            <el-select  placeholder="任课老师"  filterable v-model="formData.userId" style="width:385px;" @change="selectChange">
                                <el-option v-for="item in teacherList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="上课时间:" prop="courseDate">
                            <el-date-picker
                                v-model="formData.courseDate"
                                type="datetime"
                                placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="上课地点:" prop="coursePlace">
                            <el-input  placeholder="上课地点" v-model="formData.coursePlace"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="课程内容:" prop="courseContent">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"  placeholder="课程内容" v-model="formData.courseContent"></el-input>
                </el-form-item>
                <el-form-item label="课程备注:" prop="courseRemark">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"  placeholder="课程备注" v-model="formData.courseRemark"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取消</el-button>
                <el-button type="primary" @click="save('form')">修改</el-button>
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
                courseName:"",
                userId:"",
                courseDate:"",
                coursePlace:"",
                courseContent:"",
                courseRemark:"",
            },
            rules:{
                courseName: [{ required: true, message: '请输入课程名称'}],
                userId: [{ required: true, message: '请选择任课老师'}],
                courseDate: [{ required: true, message: '请选择任课时间'}],
                coursePlace: [{ required: true, message: '请输入任课地点'}],
                courseContent: [{ required: true, message: '请输入课程内容'}],
            },
            visible:false,
            teacherList:[]
        }
    },
    methods:{
        init(r){
            fetch.get("/api/scCourse/"+r.id).then(res => {
                if(res.code=="0"){
                    this.formData=res.data;
                    this.visible=true;
                }
                    
            })
        },
        //获取老师列表
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
        save(form){
            this.formData.courseDate=this.$moment(this.formData.courseDate).format("YYYY-MM-DD HH:mm:ss")
            this.$refs[form].validate(valid => {
                if (valid) {
                    fetch.post("/api/scCourse/save",this.formData).then(res => {
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
        //下拉框选择变动事件
        selectChange(r){
            for(var index in this.teacherList){
                if(this.teacherList[index].value==r){
                    this.formData.userName=this.teacherList[index].label;
                }
            }
        },
        closeDialog(){
            this.visible=false;
            this.formData={
                courseName:"",
                userId:"",
                courseDate:"",
                coursePlace:"",
                courseContent:"",
                courseRemark:"",
            }
        },
    }
}
</script>
<style scoped>

</style>
