<template>
    <section class="container article-detail">
        <!-- 展示区 -->
        <div class="view markdown-body" v-html="mdHTML">
            预览
        </div>
        <!-- 中间 按钮区 -->
        <div v-if="status === 'editor'" class="middle" :class="{'editor-folded': isFoldEditor}">
            <button
                class="btn iconfont icon-save"
                @click="updateArticle">
            </button>
            <button
                v-if="!isFoldEditor"
                class="btn iconfont icon-img"
                @click="imgDialogVisible = true">
            </button>
            <button
                class="btn iconfont icon-fold-right"
                :class="{'icon-fold-left': isFoldEditor}"
                @click="isFoldEditor = !isFoldEditor">
            </button>
        </div>
        <!-- 编辑区 -->
        <div v-if="status === 'editor' && !isFoldEditor" class="editor">
            <el-input
                type="textarea"
                :autosize="{minRows: 55}"
                resize="none"
                placeholder="请输入文章内容"
                v-model="mdText">
            </el-input>
        </div>
        <el-dialog
            :visible.sync="imgDialogVisible"
            :fullscreen="true"
            title="上传图片">
            <el-upload
                class="upload-demo"
                action="/api/upload"
                :on-success="handleSuccess"
                :on-preview="handlePictureCardPreview"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </el-dialog>
    </section>
</template>
<script>
/**
 * @file 文章列表页
 * @author 小强赵
 */
import message from 'element-ui/lib/message';
import 'element-ui/lib/theme-chalk/message.css';

import elTable from 'element-ui/lib/table';
import elTableColumn from 'element-ui/lib/table-column';
import 'element-ui/lib/theme-default/table.css';
import 'element-ui/lib/theme-chalk/icon.css';
import elButton from 'element-ui/lib/button';
import 'element-ui/lib/theme-chalk/button.css';
import elForm from 'element-ui/lib/form';
import 'element-ui/lib/theme-chalk/form.css';
import elFormItem from 'element-ui/lib/form-item';
import 'element-ui/lib/theme-chalk/form-item.css';
import elInput from 'element-ui/lib/input';
import elDialog from 'element-ui/lib/dialog';
import 'element-ui/lib/theme-chalk/dialog.css';
import elUpload from 'element-ui/lib/upload';
import 'element-ui/lib/theme-chalk/upload.css';

// markdown 部分
import remark from 'remark';
import midas from 'remark-midas';
import html from 'remark-html';
import highlight from 'remark-highlight.js';
// 样式
import 'highlight.js/styles/solarized-light.css';
import 'github-markdown-css/github-markdown.css';

import axios from '@/../plugins/axios';

export default {
    components: {
        elTable,
        elTableColumn,
        elButton,
        elForm,
        elFormItem,
        elInput,
        elDialog,
        elUpload
    },
    data() {
        return {
            mdHTML: '',
            mdText: '',
            content: '',
            // 上传图片弹窗
            imgDialogVisible: false,
            isFoldEditor: false,
            // 状态：preview: 预览状态, editor: 编辑状态
            status: ''
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

        this.isFoldEditor = !this.$route.query.isEdit;
        this.status = this.$route.query.isEdit ? 'editor' : 'preview';
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
            }).then(res => {
                message({
                    type: 'success',
                    message: '保存成功'
                });
            });
        },

        /**
         * 上传成功后的回调函数
         *
         * @param {Object} response 返回头
         * @param {Object} file 当前图片对象
         * @param {Array} fileList 上传列表汇总
         */
        handleSuccess(response, file, fileList) {
            file.name = '/' + response.data.path;
        },

        /**
         * 点击预览的回调，这里用作生成 markdown 图片文本
         *
         * @param {Object} file 图片对象
         */
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        }
    }
};
</script>
<style lang="less">
.article-detail {
    display: flex;
    justify-content: center;
    .view,
    .editor {
        flex: 1;
        margin: 5px;
        box-shadow: 2px 3px 5px rgba(0, 0, 0, .1), -2px -3px 5px rgba(0, 0, 0, .1);
        transition: 'width' 300ms;
        max-width: 800px;
    }

    // markdown 样式部分自定义
    .markdown-body {
        padding: 10px;
        h1 {
            border-bottom: none;
            text-align: center;
        }
        blockquote {
            background: #F6F6F6;
            padding: 10px;
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
            transition: 300ms;
            &:hover {
                background: #409EFF;
                color: #fff;
            }
        }
        .icon-fold-left {
            transform: rotate(180deg);
        }
        &.editor-folded {
            margin-right: -80px;
        }
    }
}
</style>
