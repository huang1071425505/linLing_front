<template>
    <div>
        <el-dialog  title="验收" :visible.sync="visible" width="500px" :close-on-click-modal="false" @close='closeDialog'>
            <el-form ref="form" :rules="rules" :model="formData" label-width="100px" label-position="right">
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
            formData:{},
            rules:{
                acceptanceOpinion:[{required:true,message:'验收意见不能为空'}],
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
                    fetch.post("/api/xmProject/conclud",this.formData).then(res => {
                        if (res.code == "0") {
                            Message({
                                message:"验收成功",
                                type: "success",
                                duration: 3 * 1000
                            });
                            // 更新信息
                            this.$emit("loadData");
                            this.closeDialog();
                        } else {
                            Message({
                                message: "验收失败",
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
            this.formData={}
        },
    }
}
</script>
<style scoped>

</style>
