/**
 * @file “文章”代理层
 * @author 小强赵
 */

import models from '../models';
import utiles from '../../utiles';
import auth from '../middlewares/auth';
import config from '../config';

const ArticleModel = models.ArticleModel;

export default {

    /**
     * 插入篇文章数据
     *
     * @return {Object} 插入后的数据，Promise 对象
     */
    async addArticleItem() {
        // 新文章默认内容
        const article = {
            title: '标题',
            description: '描述',
            mdContent: `
            # 标题

            > 描述

            ## 二级标题
            `.replace(/ /g, '')
        };
        console.log(article);

        // 对象
        const articleModel = new ArticleModel(article);
        return articleModel.save();
    },

    /**
     * 通过 ID 删除文章
     *
     * @param {string} id 用户 ID
     * @return {Object} 数据删除操作结果，Promise 对象
     */
    deleteArticleItem(id) {
        return ArticleModel.remove({
            _id: id  // eslint-disable-line
        });
    },

    /**
     * 更新篇文章数据
     *
     * @param {string} id 文章id
     * @param {Object} article 文章数据
     * @return {Object} 插入后的数据，Promise 对象
     */
    async updateArticleItem(id, article) {
        // 格式校验
        let valid = true;
        let statusInfo;
        if (article.title === '') {
            valid = false;
            statusInfo = '标题不可为空';
        }

        if (article.content === '') {
            valid = false;
            statusInfo = '内容不可为空';
        }

        if (!valid) {
            return Promise.reject({
                statusInfo
            });
        }

        // 对象
        const articleModel = new ArticleModel(article);
        return articleModel.save();
    },

    /**
     * 获取文章列表
     *
     * @return {Object} 数据查询操作结果，Promise 对象
     */
    getArticleList() {
        return ArticleModel.find();
    }
};
