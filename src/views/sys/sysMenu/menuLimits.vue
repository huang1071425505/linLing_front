<template>
    <el-dialog  title="权限" :visible.sync="visible" width="500px" :close-on-click-modal="false" @close='closeDialog'>
        <el-form ref="form" :rules="rules" :model="formData" label-width="100px" label-position="right">
            <el-form-item label="角色:" prop="roleId">
                <el-select v-model="formData.roleId" multiple placeholder="请选择">
                    <el-option
                        v-for="item in roleList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">取消</el-button>
            <el-button type="primary" @click="save('form')">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import fetch from '@/utils/fetch'
import { Message } from 'element-ui';
export default {
    data(){
        return{
            visible:false,
            rules:{
                roleId: [{ required: true, message: '请选择角色'}],
            },
            formData:{
                roleId:[]
            },
            roleList:[],
            menuId:null,
        }
    },
    methods:{
        init(id){
            this.menuId=id;
            this.visible=true;
            this.getNowMenuRole(id);
            this.getRoleList();
        },
        getNowMenuRole(id){
            fetch.get("/api/sysMenu/nowMenuRole/"+id).then(res => {
                if(res.code=="0"){
                    var data=[];
                    for(var index in res.data){
                        data.push(res.data[index].roleId)
                    }
                    this.formData.roleId=data;
                }
            })
        },
        getRoleList(){
            fetch.get("/api/sysRole/effective").then(res => {
                if(res.code=="0"){
                    this.roleList=[];
                    for(var index in res.data){
                        this.roleList.push({
                            value:res.data[index].roleId,
                            label:res.data[index].roleName,
                            code:res.data[index].roleCode
                        })
                    }

                }
            })
        },
        save(form){
            this.$refs[form].validate(valid => {
                if (valid) {
                    var roleIds =this.formData.roleId.join(",");
                    fetch.get("/api/sysMenu/menuLimits/"+roleIds+"/"+this.menuId).then(res => {
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
                roleId:[]
            };
        },
    }

}
</script>

<style>

</style>
