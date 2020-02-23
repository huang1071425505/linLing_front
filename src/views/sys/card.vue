<template>
  <div>
    <el-tabs v-model="editableTabsValue" type="card" :closable="closable" @tab-remove="removeTab">
      <el-tab-pane
        v-for="(item, index) in editableTabs"
        :key="index"
        :label="item.label"
        :name="item.name"
      ><router-view /></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      editableTabsValue: "1",
      editableTabs: [
        {
          label: "欢迎使用",
          name: "1",
          url:""
        },
      ],
      tabIndex: 0,
      closable:false
    };
  },
  methods: {
    //添加标签
    addTab(url,title) {
        if(this.editableTabs[0].label=="欢迎使用"){
            this.editableTabs=[];
            this.closable=true;
        }
        //重复标签name
        let cfName="";
        for(var index in this.editableTabs){
            if(url==this.editableTabs[index].url){
                cfName=this.editableTabs[index].name;
                break;
            }
        }
        if(cfName!=""){
            if(this.editableTabsValue!=cfName){
                this.editableTabsValue = cfName;
                this.$router.push(url)
            }
        }else{
            let newTabName = ++this.tabIndex+ "";
            this.editableTabs.push({
                label: title,
                name: newTabName,
                url:url,
            });
            this.editableTabsValue = newTabName;
            this.$router.push(url)
        }
    },
    //移除标签
    removeTab(targetName) {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        let activeUrl ="";
        if (activeName === targetName) {
            tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                    activeName = nextTab.name;
                    activeUrl = nextTab.url;
                }
            }
            });
        }
        if(activeUrl!=""){
            this.$router.push(activeUrl)
        }else{
            this.$router.push("/")
        }
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        if(this.editableTabs.length==0){
            this.editableTabs.push({
                label: "欢迎使用",
                name: "1",
                url:"",
            })
            this.closable=false;
        }
    }
  }
};
</script>
<style scoped>
</style>