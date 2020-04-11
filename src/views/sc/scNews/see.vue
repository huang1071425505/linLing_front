<template>
    <div>
        <el-dialog  title="查看" :visible.sync="visible" width="1050px" :close-on-click-modal="false" @close='closeDialog'>
            <el-form ref="form" :rules="rules" :model="formData" label-width="100px" label-position="right">
                <el-form-item label="新闻名称:" prop="newsTitle">
                    <el-input  placeholder="新闻名称" v-model="formData.newsTitle" disabled></el-input>
                </el-form-item>
                <el-form-item label="新闻内容:" prop="newsContent">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"  placeholder="新闻内容" v-model="formData.newsContent" disabled></el-input>
                </el-form-item>
                <el-form-item label="新闻备注:" prop="newsRemark">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"  placeholder="新闻备注" v-model="formData.newsRemark" disabled></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取消</el-button>
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
