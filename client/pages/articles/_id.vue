<template>
    <section class="container article-detail">
        文章详情页
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
        };
    },
    methods: {

        /**
         * 添加一条文章数据
         */
        addArticle() {
        }
    }
};
</script>
<style lang="less" scoped>
.article-detail {
    
}
</style>
