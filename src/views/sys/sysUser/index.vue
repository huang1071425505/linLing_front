<template>
    
</template>
<script>
import add from './add'
export default {
    
    components:{
        add,
    },
    data(){
        return{
        
        }
    },
    methods:{
        //新增
        addDialog(){
            this.$refs.add.init();
        },
    }

    
}
</script>
<style scoped>
</style>