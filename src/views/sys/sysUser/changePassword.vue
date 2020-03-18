<template>
    <el-dialog title="密码修改" :visible.sync="visible" width="500px" :close-on-click-modal="false" @close='closeDialog'>
        <el-form ref="form" :model="formData" label-width="80px" :rules="rules">
            <el-form-item label="原密码" prop="yPassword">
                <el-input v-model="formData.yPassword" show-password></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="xPassword">
                <el-input v-model="formData.xPassword" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="qrPassword">
                <el-input v-model="formData.qrPassword" show-password></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">取消</el-button>
            <el-button type="primary" @click="save('form')">修改</el-button>
        </div>
    </el-dialog>
</template>
<script>
import fetch from '@/utils/fetch';
import { Message } from 'element-ui';
export default {
    data(){
        return{
            visible:false,
            formData:{
                //原密码
                yPassword:"",
                //新密码
                xPassword:"",
                //确认密码
                qrPassword:"",
            },
            rules:{
                yPassword: [{ required: true, message: '请输入原密码'},
                            { type: 'string', min: 6, message: '密码不能小于6位'}],
                xPassword: [{ required: true, message: '请输入新密码'},
                            { type: 'string', min: 6, message: '密码不能小于6位'}],
                            // { validator: YzXPassword, trigger: 'blur' }
                qrPassword: [{ required: true, message: '请输入确认密码'},
                            { type: 'string', min: 6, message: '密码不能小于6位'}],
            }
        }
    },
    methods:{
        init(){
            this.visible=true;
        },
        save(form){
            this.$refs[form].validate(valid => {
                if (valid) {
                    if(this.formData.yPassword==this.formData.xPassword){
                        Message({
                            message: "原密码与新密码相同",
                            type: "error",
                            duration: 3 * 1000
                        });
                        return
                    }
                    if(this.formData.qrPassword!=this.formData.xPassword){
                        Message({
                            message:"新密码与确认密码不符",
                            type: "error",
                            duration: 3 * 1000
                        });
                        return
                    }
                    fetch.post("/api/sysUsers/exitPassword",this.formData).then(res => {
                        if(res.code=="0"){
                            this.$store.dispatch('logout').then(res => {
                                if (res.code == "0") {
                                    window.location.href = "/login";
                                    Message({
                                        message:"修改成功",
                                        type: "success",
                                        duration: 3 * 1000
                                    });
                                } else {
                                    Message({
                                        message: res.msg,
                                        type: "error",
                                        duration: 3 * 1000
                                    });
                                }
                            });
                        }else{
                            Message({
                                message:"修改失败",
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
                //原密码
                yPassword:"",
                //新密码
                xPassword:"",
                //确认密码
                qrPassword:"",
            }
        }

    }
    
}
</script>
<style scoped>

</style>
