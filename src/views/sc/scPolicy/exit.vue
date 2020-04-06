<template>
    <div>
        <el-dialog  title="修改" :visible.sync="visible" width="1050px" :close-on-click-modal="false" @close='closeDialog'>
            <el-form ref="form" :rules="rules" :model="formData" label-width="100px" label-position="right">
                <el-form-item label="政策名称:" prop="policyName">
                    <el-input  placeholder="政策名称" v-model="formData.policyName" ></el-input>
                </el-form-item>
                <el-form-item label="发布部门:" prop="releaseBm">
                    <el-input  placeholder="发布部门" v-model="formData.releaseBm" ></el-input>
                </el-form-item>
                <el-form-item label="政策内容:" prop="policyContent">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"  placeholder="政策内容" v-model="formData.policyContent" ></el-input>
                </el-form-item>
                <el-form-item label="政策备注:" prop="policyRemark">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"  placeholder="政策备注" v-model="formData.policyRemark" ></el-input>
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
                policyName:"",
                releaseBm:"",
                policyContent:"",
                policyRemark:"",
            },
            rules:{
                policyName:[{ required: true, message: '请输入政策名称'}],
                releaseBm:[{ required: true, message: '请输入发布部门'}],
                policyContent:[{ required: true, message: '请输入政策内容'}],
                policyRemark:[{ required: true, message: '请输入政策备注'}],
            },
            visible:false,
        }
    },
    methods:{
        init(r){
            fetch.get("/api/scPolicy/"+r.id).then(res => {
                if(res.code=="0"){
                    this.formData=res.data;
                    this.visible=true;
                }
                    
            })
        },
        save(form){
            this.formData.courseDate=this.$moment(this.formData.courseDate).format("YYYY-MM-DD HH:mm:ss")
            this.$refs[form].validate(valid => {
                if (valid) {
                    fetch.post("/api/scPolicy/save",this.formData).then(res => {
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
                policyName:"",
                releaseBm:"",
                policyContent:"",
                policyRemark:"",
            }
        },
    }
}
</script>
<style scoped>

</style>
