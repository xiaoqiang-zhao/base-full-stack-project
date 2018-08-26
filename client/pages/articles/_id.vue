<template>
    <section class="container article-detail">
        <!-- 展示区 -->
        <div class="view markdown-body" v-html="mdHTML">
            预览
        </div>
        <!-- 中间 按钮区 -->
        <div class="middle">
            按钮
        </div>
        <!-- 编辑区 -->
        <div class="editor">
            <el-input
                type="textarea"
                :autosize="{minRows: 55}"
                resize="none"
                placeholder="请输入文章内容"
                v-model="content">
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
    // async asyncData() {
    //     let tableData;
    //     try {
    //         const res = await axios.get('/api/articles');
    //         tableData = res.data;
    //     }
    //     catch (e) {
    //         tableData = [];
    //     }

    //     return {
    //         tableData
    //     };
    // },
    data() {
        return {
            mdHTML: '',
            mdText: `
# 大标题

> 说明文字。

## 二级标题

CSS 代码

~~~css
h1 {
  color: red;
}
~~~

Less 代码
~~~less
.a {
  .b {
    display: block;
  }
}
~~~

Javascript 代码
~~~jsvascript
let a = '';
console.log(a);
~~~

表格：

Name | Academy | score 
- | :-: | -: 
Harry Potter | Gryffindor| 90 
Hermione Granger | Gryffindor | 100 
Draco Malfoy | Slytherin | 90

图片：-- 图片的引用路径是个问题，需要制定一套规则，比如图片库..

![ddd](/static/img/long.060c26b.jpg)

文本样式：[链接](http://baidu.com)  **加粗** \`引用\` ~~删除~~

1. 列表一
2. 列表二

- 列表一
- 列表二

换行  
而非换段落

换段落

换段落`,
            content: ''
        };
    },
    watch: {
        mdText(newValue, oldValue) {
            this.mdToHtml();
        }
    },
    mounted() {
        this.mdToHtml();
    },
    methods: {

        /**
         * 添加一条文章数据
         */
        addArticle() {
        },
        mdToHtml(md) {
            const me = this;
            remark()
                .use([html, midas])
                .use(highlight)
                .process(this.mdText, (err, file) => {
                    me.mdHTML = file.contents;
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

    .editor .el-textarea > textarea {
        border: none;
        padding: 10px 13px;
    }

    .middle {
        flex: 0 0 80px;
        margin: 5px;
        text-align: center;
    }
}
</style>
