<template>
    <div>
        <app-header ref="header"></app-header>
        <main class="app-main">
            <app-nav></app-nav>
            <nuxt></nuxt>
        </main>
        <!-- <app-footer></app-footer> -->
    </div>
</template>

<script>
/**
 * @file 默认页面布局
 * @author 小强赵
 */
import appHeader from '../components/app-header.vue';
import appNav from '../components/app-nav.vue';
import appFooter from '../components/app-footer.vue';
import 'element-ui/lib/theme-chalk/message.css';
import 'element-ui/lib/theme-chalk/icon.css';

export default {
    components: {
        appHeader,
        appNav,
        appFooter
    },
    mounted() {
        // 用于全局调用登录弹框
        window.rootVueComponent = this;
    }
};
</script>

<style lang="less">
.app-main {
    min-height: 100vh;
    display: flex;
    box-sizing: border-box;
    padding-top: 60px;

    .app-nav {
        flex: 0 0 120px;
        box-sizing: border-box;
        box-shadow: 2px 3px 5px rgba(0, 0, 0, .1);
    }

    .container {
        flex: 1;
        margin: 0;
        box-sizing: border-box;
        padding: 10px;
    }
}
</style>
