<template>
    <header class="app-header">
        <img src="@/assets/img/logo.png"
             class="logo"
             alt="logo"
             width="50"
             height="50">
        <span class="title">基础全栈项目</span>
        <span v-if="currentUser" class="user" @click="dialogVisible = true">{{currentUser.name}}</span>
        <span v-else class="btn-login" @click="dialogVisible = true">登录</span>

        <!-- 登录弹框 -->
        <el-dialog
            custom-class="login-dialog"
            title="登录"
            :visible.sync="dialogVisible"
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
                <el-button type="primary" @click="login">
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

import axios from '@/plugins/axios';

export default {
    components: {
        elButton,
        elDialog,
        elForm,
        elFormItem,
        elInput
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
        async login() {
            const currentUser = await axios.post('/api/users/login', this.form);
            this.setCurrentUser(currentUser);
        },
        setCurrentUser(currentUser) {
            this.currentUser = currentUser;
        }
    }
};
</script>
<style lang="less" scoped>
.app-header {
    position: absolute;
    z-index: 9998;
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
    .btn-login,
    .user {
        float: right;
        font-size: 14px;
        color: #6b6a6a;
    }
    .btn-login {
        cursor: pointer;
    }
}
</style>
