<template>
    <div>
        <el-dialog  title="新增" :visible.sync="visible1" width="500px" :close-on-click-modal="false" :append-to-body='true' @close='closeDialog'>
            <el-form ref="form" :rules="rules" :model="formData" label-width="100px" label-position="right">
                <el-form-item label="进展记录:" prop="processRecord">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"  placeholder="进展记录" v-model="formData.processRecord"></el-input>
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
                processRecord:"",
                projectId:"",
            },
            rules:{
                processRecord:[{required:true,message:'进展记录不能为空'}],
            },
            visible1:false,
        }
    },
    methods:{
        init(projectId){
            this.formData.projectId=projectId;
            this.visible1=true;
        },
        save(form){
            this.$refs[form].validate(valid => {
                if (valid) {
                    this.formData.recordType="进展记录";
                    fetch.post("/api/xmProjectProcess/save",this.formData).then(res => {
                        if (res.code == "0") {
                            Message({
                                message:"新增成功",
                                type: "success",
                                duration: 3 * 1000
                            });
                            // 更新信息
                            this.$emit("loadData");
                            this.closeDialog();
                        } else {
                            Message({
                                message: "新增失败",
                                type: "error",
                                duration: 3 * 1000
                            });
                        }
                    })
                }
            })
        },
        closeDialog(){
            this.visible1=false;
            this.formData={
                processRecord:"",
                projectId:"",
            }
        },
    }
}
</script>
<style scoped>

</style>
