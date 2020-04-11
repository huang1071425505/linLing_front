<template>
    <div>
        <el-dialog  title="修改" :visible.sync="visible" width="1050px" :close-on-click-modal="false" @close='closeDialog'>
            <el-form ref="form" :rules="rules" :model="formData" label-width="100px" label-position="right">
                <el-form-item label="新闻名称:" prop="newsTitle">
                    <el-input  placeholder="新闻名称" v-model="formData.newsTitle"></el-input>
                </el-form-item>
                <el-form-item label="新闻内容:" prop="newsContent">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"  placeholder="新闻内容" v-model="formData.newsContent"></el-input>
                </el-form-item>
                <el-form-item label="新闻备注:" prop="newsRemark">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"  placeholder="新闻备注" v-model="formData.newsRemark"></el-input>
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
                newsTitle:"",
                newsContent:"",
                newsRemark:"",
            },
            rules:{
                newsTitle: [{ required: true, message: '请输入新闻名称'}],
                newsContent: [{ required: true, message: '请输入新闻内容'}],
                newsRemark: [{ required: true, message: '请输入新闻备注'}],
            },
            visible:false
        }
    },
    methods:{
        init(r){
            fetch.get("/api/scNews/"+r.id).then(res => {
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
                    fetch.post("/api/scNews/save",this.formData).then(res => {
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
                newsTitle:"",
                newsContent:"",
                newsRemark:"",
            }
        },
    }
}
</script>
<style scoped>

</style>
