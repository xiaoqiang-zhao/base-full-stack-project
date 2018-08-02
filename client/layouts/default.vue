<template>
    <div>
        <app-header></app-header>
        <nuxt></nuxt>
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

export default {
    components: {
        appHeader,
        appFooter
    }
};
</script>

<style>
.container {
    margin: 0;
    padding: 5px;
}
</style>
