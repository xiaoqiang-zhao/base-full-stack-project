<template>
    <section class="container article-detail">
        <!-- 展示区 -->
        <div class="view markdown-body" v-html="mdHTML">
            预览
        </div>
        <!-- 中间 按钮区 -->
        <div class="middle">
            <button class="btn iconfont icon-save" @click="updateArticle"></button>
            <button class="btn iconfont icon-img"></button>
            <button class="btn iconfont icon-fold-right"></button>
        </div>
        <!-- 编辑区 -->
        <div class="editor">
            <el-input
                type="textarea"
                :autosize="{minRows: 55}"
                resize="none"
                placeholder="请输入文章内容"
                v-model="mdText">
            </el-input>
        </div>
    </section>
</template>
<script>
/**
 * @file 文章列表页
 * @author 小强赵
 */
import elTable from 'element-ui/lib/table';
import elTableColumn from 'element-ui/lib/table-column';
import 'element-ui/lib/theme-default/table.css';
import 'element-ui/lib/theme-chalk/icon.css';
import elButton from 'element-ui/lib/button';
import 'element-ui/lib/theme-chalk/button.css';
import messageBox from 'element-ui/lib/message-box';
import 'element-ui/lib/theme-chalk/message-box.css';
import message from 'element-ui/lib/message';
import 'element-ui/lib/theme-chalk/message.css';
import elForm from 'element-ui/lib/form';
import 'element-ui/lib/theme-chalk/form.css';
import elFormItem from 'element-ui/lib/form-item';
import 'element-ui/lib/theme-chalk/form-item.css';
import elInput from 'element-ui/lib/input';

// markdown 部分
import remark from 'remark';
import midas from 'remark-midas';
import html from 'remark-html';
import highlight from 'remark-highlight.js';
// 样式
import 'highlight.js/styles/solarized-light.css';
import 'github-markdown-css/github-markdown.css';

import axios from '@/../plugins/axios';
import utiles from '@/../utiles';

export default {
    components: {
        elTable,
        elTableColumn,
        elButton,
        elForm,
        elFormItem,
        elInput
    },
    data() {
        return {
            mdHTML: '',
            mdText: '',
            content: ''
        };
    },
    watch: {
        mdText(newValue, oldValue) {
            this.mdToHtml();
        }
    },
    mounted() {
        axios.get(`/api/articles/${this.$route.params.id}`).then(res => {
            this.mdText = res.data.mdContent;
            this.mdToHtml();
        });
    },
    methods: {

        /**
         * 将 markdown 转为 html
         *
         * @param {string} md markdown 内容
         */
        mdToHtml(md) {
            const me = this;
            remark()
                .use([html, midas])
                .use(highlight)
                .process(this.mdText, (err, file) => {
                    me.mdHTML = file.contents;
                });
        },

        /**
         * 更新文章内容
         */
        updateArticle() {
            axios.post(`/api/articles/${this.$route.params.id}`, {
                mdContent: this.mdText
            });
        }
    }
};
</script>
<style lang="less">
.article-detail {
    display: flex;
    .view,
    .editor {
        flex: 1;
        margin: 5px;
        box-shadow: 2px 3px 5px rgba(0, 0, 0, .1), -2px -3px 5px rgba(0, 0, 0, .1);
    }

    // markdown 样式部分自定义
    .markdown-body {
        padding: 10px;
        h1 {
            border-bottom: none;
            text-align: center;
        }
    }

    .editor .el-textarea > textarea {
        border: none;
        padding: 10px 13px;
    }

    .middle {
        flex: 0 0 80px;
        margin: 5px;
        text-align: center;
        .btn {
            display: inline-block;
            width: 2.5em;
            height: 2.5em;
            line-height: 2.5em;
            margin: 20px 0;
            background: none;
            border: none;
            border-radius: 50px;
            font-size: 18px;
            text-align: center;
            box-shadow: 2px 3px 5px rgba(0, 0, 0, .1), -2px -3px 5px rgba(0, 0, 0, .1);
            outline: none;
            cursor: pointer;
            &:hover {
                background: #409EFF;
                color: #fff;
            }
        }
    }
}
</style>
