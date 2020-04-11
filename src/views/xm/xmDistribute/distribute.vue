<template>
    <div>
        <el-dialog  title="分配" :visible.sync="visible" width="500px" :close-on-click-modal="false" @close='closeDialog'>
            <el-form ref="form" :rules="rules" :model="formData" label-width="100px" label-position="right">
                <el-form-item label="评审专家:" prop="roleName">
                    <el-select  placeholder="评审专家" multiple  filterable v-model="formData.userIds" style="width:250px;" >
                        <el-option v-for="item in zjList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
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
                userIds:[],
            },
            rules:{},
            visible:false,
            zjList:[],
        }
    },
    methods:{
        init(r){
            fetch.get("/api/xmProject/"+r.id).then(res => {
                if(res.code=="0"){
                    this.getZjList();
                    this.formData=res.data;
                    this.visible=true;
                }
            })
        },
        //获取专家列表
        getZjList(){
            fetch.get("/api/sysUsers/roleList/3").then(res => {
                if(res.code=="0"){
                    this.zjList=[];
                    for(var index in res.data){
                        this.zjList.push({
                            label:res.data[index].userName,
                            value:res.data[index].userId
                        })
                    }
                }
            })
        },
        save(form){
            this.$refs[form].validate(valid => {
                if (valid) {
                    this.formData.userIds=this.formData.userIds.join(",");
                    delete this.formData.createDate
                    fetch.post("/api/xmProject/distribute",this.formData).then(res => {
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
            this.formData={}
        },
    }
}
</script>
<style scoped>

</style>
