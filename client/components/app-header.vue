<template>
    <header class="app-header">
        <img src="@/assets/img/logo.png"
             class="logo"
             alt="logo"
             width="50"
             height="50">
        <span class="title">基础全栈项目</span>
        <!-- <span v-if="currentUser" class="user" @click="dialogVisible = true">{{currentUser.name}}</span> -->
        <el-dropdown v-if="currentUser" trigger="click" @command="handleCommand" class="user">
            <span class="el-dropdown-link">
                {{currentUser.name}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="jump">个人中心</el-dropdown-item>
                <el-dropdown-item command="logout" divided>退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
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
import 'element-ui/lib/theme-chalk/icon.css';

import axios from '@/plugins/axios';

export default {
    components: {
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
        axios.get('/api/users/current').then(res => {
            const currentUser = res.data;
            if (currentUser) {
                this.setCurrentUser(currentUser);
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
            if (command === 'logout') {
                // 退出
                axios.post('/api/users/signout').then(() => {
                    this.setCurrentUser(null);
                });
            }
            else {
                // debugger
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
    .btn-signin,
    .user {
        float: right;
        font-size: 14px;
        color: #6b6a6a;
    }
    .btn-signin {
        cursor: pointer;
    }
    .user {
        padding-top: 17px;
        line-height: 16px;
    }
    .el-dropdown-menu {
        background: #fff;
    }

}
</style>
