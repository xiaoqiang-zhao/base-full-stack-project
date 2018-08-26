<template>
    <header class="app-header">
        <!-- logo 部分 -->
        <img src="@/assets/img/logo.png"
             class="logo"
             alt="logo"
             width="50"
             height="50">
        <span class="title">基础全栈项目</span>

        <!-- 导航部分 -->
        <el-menu
            class="menu"
            :router="true"
            :default-active="activeIndex"
            mode="horizontal">
            <el-menu-item index="/articles">文章管理</el-menu-item>
            <!-- <el-menu-item index="/articles">统计分析</el-menu-item> -->
            <el-menu-item index="/users">用户管理</el-menu-item>
        </el-menu>

        <!-- 用户部分 -->
        <div v-if="currentUser" class="user">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    {{currentUser.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="jump">个人中心</el-dropdown-item>
                    <el-dropdown-item command="signout" divided>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <span v-else class="btn-signin" @click="dialogVisible = true">登录</span>

        <!-- 登录弹框 -->
        <el-dialog
            custom-class="signin-dialog"
            title="登录"
            :visible.sync="dialogVisible"
            :append-to-body="true"
            width="500px">
            <el-form ref="form" :model="form" :rules="formRules" label-width="95px">
                <el-form-item label="用户名:" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="密码:" prop="name">
                    <el-input v-model="form.pwd"></el-input>
                </el-form-item>
            </el-form>
            <section slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">
                    取 消
                </el-button>
                <el-button type="primary" @click="signin">
                    确 定
                </el-button>
            </section>
        </el-dialog>
    </header>
</template>
<script>
/**
 * @file 整个应用的头部
 * @author 小强赵
 */

import 'element-ui/lib/theme-chalk/icon.css';

import elMenu from 'element-ui/lib/menu';
import 'element-ui/lib/theme-chalk/menu.css';
import elMenuItem from 'element-ui/lib/menu-item';
import 'element-ui/lib/theme-chalk/menu-item.css';

import elButton from 'element-ui/lib/button';
import 'element-ui/lib/theme-chalk/button.css';

import elDialog from 'element-ui/lib/dialog';
import 'element-ui/lib/theme-chalk/dialog.css';

import elForm from 'element-ui/lib/form';
import 'element-ui/lib/theme-chalk/form.css';
import elFormItem from 'element-ui/lib/form-item';
import 'element-ui/lib/theme-chalk/form-item.css';
import elInput from 'element-ui/lib/input';
import 'element-ui/lib/theme-chalk/input.css';

import elDropdown from 'element-ui/lib/dropdown';
import 'element-ui/lib/theme-chalk/dropdown.css';
import elDropdownMenu from 'element-ui/lib/dropdown-menu';
import 'element-ui/lib/theme-chalk/dropdown-menu.css';
import elDropdownItem from 'element-ui/lib/dropdown-item';
import 'element-ui/lib/theme-chalk/dropdown-item.css';

import message from 'element-ui/lib/message';
import 'element-ui/lib/theme-chalk/message.css';

import axios from '@/../plugins/axios.js';

export default {
    components: {
        elMenu,
        elMenuItem,
        elButton,
        elDialog,
        elForm,
        elFormItem,
        elInput,
        elDropdown,
        elDropdownMenu,
        elDropdownItem
    },
    data() {
        return {
            activeIndex: '/articles',
            dialogVisible: false,
            form: {
                name: '',
                pwd: ''
            },
            formRules: {
                name: [{
                    required: true,
                    message: '必填项',
                    trigger: 'blur'
                }],
                pwd: [{
                    required: true,
                    message: '必填项',
                    trigger: 'blur'
                }]
            },
            currentUser: null
        };
    },
    mounted() {
        axios.get('/api/users/current', {
            // 去除统一提示
            axiosSystemErrorMessage: false
        }).then(res => {
            const currentUser = res.data;
            if (currentUser) {
                this.setCurrentUser(currentUser);
            }
        });

        // 处理刷新时 menu 选中某个 item
        const map = [
            {
                paths: ['/users'],
                path: '/users'
            },
            // 首页配置需要放在最后面
            {
                paths: ['/articles', '/'],
                path: '/articles'
            }
        ];
        map.some(item => {
            if (item.paths.indexOf(this.$route.path) > -1) {
                this.activeIndex = item.path;
                return true;
            }
        });
    },
    methods: {
        async signin() {
            const res = await axios.post('/api/users/signin', this.form);
            // 登录成功
            if (res.data) {
                this.dialogVisible = false;
                this.setCurrentUser(res.data);
            }
            // 登录失败
            else {
                message({
                    type: 'error',
                    message: res.statusInfo
                });
            }
        },
        setCurrentUser(currentUser) {
            this.currentUser = currentUser;
        },
        handleCommand(command) {
            if (command === 'signout') {
                // 退出
                axios.post('/api/users/signout').then(() => {
                    this.setCurrentUser(null);
                });
            }
            else {
                this.$router.push({
                    path: '/personal-center'
                });
            }
        }
    }
};
</script>
<style lang="less" scoped>
.app-header {
    display: flex;
    position: relative;
    z-index: 2;
    width: 100%;
    box-sizing: border-box;
    box-shadow: 2px 3px 5px rgba(0, 0, 0, .1);
    padding: 0 20px;
    line-height: 60px;
    .logo {
        flex: 0 0 50px;
        vertical-align: top;
        height: 50px;
        margin: 5px 0;
    }
    .title {
        flex: 0 0 150px;
        display: inline-block;
        padding-left: 10px;
        font-size: 20px;
        vertical-align: top;
        color: #4a4a4a;
    }
    .menu {
        flex: 1;
        display: inline-block;
        border: none;
        text-align: center;
    }
    .btn-signin,
    .user {
        flex: 0 0 50px;
        font-size: 14px;
        color: #6b6a6a;
    }
    .btn-signin {
        cursor: pointer;
    }
    .user {
        padding-top: 24px;
        line-height: 16px;
    }
    .el-dropdown-menu {
        background: #fff;
    }

}
</style>
