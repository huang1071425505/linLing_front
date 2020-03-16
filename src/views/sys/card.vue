<template>
  <div>
    <el-tabs v-model="editableTabsValue" type="card" @tab-remove="removeTab" @tab-click="handleClick">
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :label="item.label"
        :name="item.name"
        :closable="item.closable"
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
          url:"/",
          index:"0",
          closable:false
        },
      ],
      tabIndex: 1,
    };
  },
  methods: {
    //添加标签
    addTab(xzIndex,url,title) {
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
                index:xzIndex,
                closable:true
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
        let dqIndex = 0;
        let xzIndex = "";
        tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
                dqIndex = index;
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                    activeName = nextTab.name;
                    activeUrl = nextTab.url;
                    xzIndex = nextTab.index;
                }
            }
        });
        this.$emit("synchroData",xzIndex);
        if(activeUrl!=""){
            if((dqIndex+1)!=parseInt(this.editableTabsValue)&&(dqIndex-1)!=parseInt(this.editableTabsValue)){
                this.$router.push(activeUrl)
            }
        }else{
            this.$router.push("/")
        }
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        this.tabIndex=parseInt(this.editableTabs[this.editableTabs.length-1].name)
    },
    handleClick(tab) {
        let item = this.editableTabs[parseInt(tab.index)];
        if(this.editableTabsValue!=item.url){
            this.$emit("synchroData",item.index);
            this.$router.push(item.url)
        }
    },
  }
};
</script>
<style scoped>
</style>