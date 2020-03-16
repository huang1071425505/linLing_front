<template>
    <div>
        <el-dialog  title="修改" :visible.sync="visible" width="1050px" :close-on-click-modal="false" @close='closeDialog'>
            <el-form ref="form" :rules="rules" :model="formData" label-width="100px" label-position="right">
                
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="项目编号:" prop="projectCode">
                            <el-input  placeholder="项目编号" v-model="formData.projectCode"></el-input>
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
                            <el-input  placeholder="年度" v-model="formData.projectYear"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="项目所属领域:" prop="projectField">
                            <el-input  placeholder="项目所属领域" v-model="formData.projectField"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="指导教师:" prop="projectTeacherId">
                            <el-input  placeholder="指导教师" v-model="formData.projectTeacherId"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="项目经费:" prop="projectFunds">
                            <el-input  placeholder="项目经费" v-model="formData.projectFunds"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="项目介绍:" prop="projectIntroduce">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"  placeholder="项目介绍" v-model="formData.projectIntroduce"></el-input>
                </el-form-item>
                <el-form-item label="备注:" prop="projectRemark">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"  placeholder="备注" v-model="formData.projectRemark"></el-input>
                </el-form-item>
                <el-form-item label="验收意见:" prop="acceptanceOpinion">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"  placeholder="验收意见" v-model="formData.acceptanceOpinion"></el-input>
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
                acceptanceOpinion:"",
            },
            rules:{
            },
            visible:false
        }
    },
    methods:{
        init(r){
            fetch.get("/api/xmProject/"+r.id).then(res => {
                if(res.code=="0"){
                    this.formData=res.data;
                    this.visible=true;
                }
            })
        },
        save(form){
            this.$refs[form].validate(valid => {
                if (valid) {
                    delete this.formData.createDate
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
