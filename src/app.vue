<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {

}
</script>

<style>
/* 消除浏览器中的白边 */
    body{
        margin: 0;
        padding: 0;
    }
    /* table表头和内容列表线对齐 */
    body .el-table th.gutter {
        display: table-cell !important
    }
</style>
