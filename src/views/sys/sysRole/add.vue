<template>
    <div>
        <el-dialog  title="新增" :visible.sync="visible" width="500px" :close-on-click-modal="false" @close='closeDialog'>
            <el-form ref="form" :rules="rules" :model="formData" label-width="100px" label-position="right">
                <el-form-item label="角色编号:" prop="roleCode">
                    <el-input  placeholder="角色编号" v-model="formData.roleCode"></el-input>
                </el-form-item>
                <el-form-item label="角色名:" prop="roleName">
                    <el-input  placeholder="角色名" v-model="formData.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色详情:" prop="roleDetails">
                    <el-input  placeholder="角色详情" v-model="formData.roleDetails"></el-input>
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
                roleCode:"",
                roleName:"",
                roleDetails:"",
            },
            rules:{
                roleCode: [{ required: true, message: '请输入角色编号'},
                            { pattern: /^[a-z0-9]+$/, message: "请输入数字" },
                            { validator: YzRoleCode, trigger: 'blur' }],
                roleName: [{ required: true, message: '请输入角色名'}],
            },
            visible:false
        }
        function YzRoleCode(rule, value, callback){
            fetch.get("/api/sysRole/yzRoleCode/"+value).then(res => {
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
        },
        save(form){
            this.$refs[form].validate(valid => {
                if (valid) {
                    fetch.post("/api/sysRole/save",this.formData).then(res => {
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
                roleCode:"",
                roleName:"",
                roleDetails:"",
            }
        },
    }
}
</script>
<style scoped>

</style>
