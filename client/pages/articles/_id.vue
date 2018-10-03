<template>
    <section class="container article-detail">
        <!-- 展示区 -->
        <div class="view markdown-body">
            <h1>{{title}}</h1>
            <div class="tags date">
                <span
                    v-for="item in tags"
                    class="item selected">
                    {{item}}
                </span>
                <span class="date-text">{{createDate}}</span>
            </div>
            <div v-html="mdHTML"></div>
        </div>
        <!-- 中间 按钮区 -->
        <div class="middle">
            <button class="btn iconfont icon-save"></button>
        </div>
    </section>
</template>
<script>
/**
 * @file 文章详情页
 * @author 小强赵
 */

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
    layout: 'blog',
    data() {
        return {
            mdHTML: '',
            mdText: '',
            title: '',
            // 文章创建时间
            createDate: '',
            tags: [],
            titleTree: []
        };
    },
    mounted() {
        axios.get(`/api/articles/${this.$route.params.id}`).then(res => {
            this.title = res.data.title;
            this.createDate = utiles.formatDate(res.data.createDate, true);
            this.mdText = res.data.mdContent;
            this.tags = res.data.tags;
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
                .use(() => treeRoot => this.pickUpTitleTree(treeRoot))
                .process(this.mdText, (err, file) => {
                    me.mdHTML = file.contents;
                });
        },

        /**
         * 提取标题树
         *
         * @param {Object} treeRoot md 文档树根节点
         */
        pickUpTitleTree(treeRoot) {
            const titleTree = [];
            treeRoot.children.forEach(item => {
                if (item.type === 'heading' && item.depth > 1) {
                    // console.log(item.children[0].value);
                    if (item.depth === 2) {
                        titleTree.push({
                            text: item.children[0].value
                        });
                    }
                    else if (item.depth === 3) {
                        const last = titleTree[titleTree.length - 1];
                        last.children = last.children ? last.children : [];
                        last.children.push({
                            text: item.children[0].value
                        });
                    }
                }
            });
            this.titleTree = titleTree;
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
        overflow: auto;
    }

    // markdown 样式部分自定义
    .markdown-body {
        padding: 10px 20px;
        h1 {
            border-bottom: none;
            text-align: center;
        }
        // 隐藏原有 title，手动添加 title，再在 title 下写入 tag
        > div > h1 {
            display: none;
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

    .tags {
        padding-bottom: 6px;
        font-size: 13px;
        .item {
            display: inline-block;
            padding: 0 6px;
            margin: 0 6px 6px 0;
            background: #b1b3b3;
            color: #1e1e1e;
            height: 22px;
            line-height: 22px;
            font-weight: normal;
            cursor: pointer;
            &.selected {
                color: #017E66;
                background-color: rgba(1,126,102,0.08);
            }
        }
        .date-text {
            float: right;
            color: #909399;
        }
    }
}
</style>
