<template>
    <div>
        <app-header ref="header"></app-header>
        <nuxt to="/articles"></nuxt>
        <app-footer></app-footer>
    </div>
</template>

<script>
/**
 * @file 默认页面布局
 * @author 小强赵
 */
import appHeader from '../components/app-header.vue';
import appFooter from '../components/app-footer.vue';
import 'element-ui/lib/theme-chalk/message.css';
import 'element-ui/lib/theme-chalk/icon.css';

export default {
    components: {
        appHeader,
        appFooter
    },
    mounted() {
        // 用于全局调用登录弹框
        window.rootVueComponent = this;
    }
};
</script>

<style lang="less">
.container {
    padding: 5px;
}
</style>
