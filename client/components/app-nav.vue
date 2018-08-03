<template>
    <nav class="app-nav">
        <el-menu
            default-active="1">
            <el-menu-item index="1">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="2" disabled>
                <i class="el-icon-document"></i>
                <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="3">
                <i class="el-icon-setting"></i>
                <span slot="title">导航四</span>
            </el-menu-item>
        </el-menu>
    </nav>
</template>
<script>
/**
 * @file 整个应用的导航
 * @author 小强赵
 */

import elMenu from 'element-ui/lib/menu';
import 'element-ui/lib/theme-chalk/icon.css';
import 'element-ui/lib/theme-chalk/menu.css';
import 'element-ui/lib/theme-chalk/menu-item.css';
import elMenuItem from 'element-ui/lib/menu-item';

export default {
    components: {
        elMenu,
        elMenuItem
    },
    data() {
        return {};
    }
};
</script>
<style lang="less" scoped>
.app-nav {
    position: relative;
    z-index: 1;
    .el-menu {
        border-right: none;
    }
}
</style>
