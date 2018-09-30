<template>
    <div class="page-root">
        <app-header ref="header"></app-header>
        <nuxt to="/articles"></nuxt>
        <app-footer></app-footer>
    </div>
</template>

<script>
/**
 * @file 管理端页面布局
 * @author 小强赵
 */
import appHeader from '../components/app-header.vue';
import appFooter from '../components/app-footer.vue';
import 'element-ui/lib/theme-chalk/message.css';

export default {
    components: {
        appHeader,
        appFooter
    }
};
</script>

<style lang="less">
.page-root {
    position: relative;
    min-height: 100vh;
}
.container {
    padding: 5px 5px 20px 5px;
}
</style>
