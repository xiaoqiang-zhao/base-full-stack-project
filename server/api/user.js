/**
 * @file 用户实体相关的接口
 * @author 小强赵
 */

import user from '../proxy/user.js';

export default {

    /**
     * 登录
     *
     * @param {Object} req 请求
     * @param {Object} res 返回
     */
    async login(req, res) {
        const result = await user.login(req.body, res);
        const map = [
            {
                statusInfo: '登录成功',
                data: result.data
            },
            {
                statusInfo: '用户不存在'
            },
            {
                statusInfo: '用户名和密码不匹配'
            }
        ];

        const data = map[result.type];
        data.status = 0;

        res.send(data);
    },

    /**
     * 获取当前用户信息
     *
     * @param {Object} req 请求
     * @param {Object} res 返回
     */
    async getCurrentUserInfo(req, res) {
        const userList = await this.getUserList(req, res);
        if (userList.length === 0) {
            res.send({
                status: 0,
                statusInfo: '请初始化 Root 用户',
                data: {}
            });
        }
    },

    /**
     * 获取用户列表
     *
     * @param {Object} req 请求
     * @param {Object} res 返回
     */
    getUserList(req, res) {
        user.getUserList().then(data => {
            res.send({
                status: 0,
                statusInfo: '',
                data
            });
        });
    },

    /**
     * 按 ID 删除某个用户
     *
     * @param {Object} req 请求
     * @param {Object} res 返回
     */
    deleteUserItem(req, res) {
        user.deleteUserItem(req.params.id).then(data => {
            res.send({
                status: 0,
                statusInfo: '',
                data
            });
        }, err => {
            res.send({
                status: 1,
                statusInfo: '删除失败',
                data: err
            });
        });
    },

    /**
     * 添加一个用户
     *
     * @param {Object} req 请求
     * @param {Object} res 返回
     */
    addUserItem(req, res) {
        user.addUserItem(req.body).then(data => {
            res.send({
                status: 0,
                statusInfo: '',
                data
            });
        }, err => {
            res.send({
                status: 1,
                ...err
            });
        });
    }

    /**
     * 初始化 Root 用户 -- 系统初始化完成后注释掉此方法
     *
     * @param {Object} req 请求
     * @param {Object} res 返回
     */
    // initRootUser(req, res) {
    //     user.addUserItem({
    //         name: 'root',
    //         pwd: 'root'
    //     }).then(data => {
    //         res.send({
    //             status: 0,
    //             statusInfo: '',
    //             data
    //         });
    //     }, err => {
    //         res.send({
    //             status: 1,
    //             ...err
    //         });
    //     });
    // }
};
