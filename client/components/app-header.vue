<template>
    <header class="app-header">
        <img src="@/assets/img/logo.png"
             class="logo"
             alt="logo"
             width="50"
             height="50">
        <span class="title">基础全栈项目</span>
        <span class="btn-login">登录</span>
    </header>
</template>
<script>
/**
 * @file 整个应用的头部
 * @author 小强赵
 */
export default {
    components: {},
    data() {
        return {};
    }
};
</script>
<style lang="less" scoped>
.app-header {
    position: absolute;
    z-index: 2;
    top: 0;
    width: 100%;
    box-sizing: border-box;
    box-shadow: 2px 3px 5px rgba(0, 0, 0, .1);
    padding: 5px 20px;
    line-height: 50px;
    .logo {
        vertical-align: top;
        height: 50px;
    }
    .title {
        display: inline-block;
        padding-left: 10px;
        font-size: 20px;
        vertical-align: top;
        color: #4a4a4a;
    }
    .btn-login {
        float: right;
        font-size: 14px;
        color: #6b6a6a;
    }
}
</style>
