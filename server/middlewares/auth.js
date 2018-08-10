/**
 * @file 权限管理中间件
 * @author 小强赵
 */

import config from '../config';

export default {

    /**
     * 种 session，其实是服务器端只读 token
     *
     * @param {Object} token 用户标识
     * @param {Object} res 返回头
     */
    setSession(token, res) {
        const opts = {
            path: '/',
            maxAge: 1000 * 60 * 60 * 24 * 30,
            signed: true,
            httpOnly: true
        };
        // cookie 有效期30天
        res.cookie(config.authCookieName, token, opts);
    },

    /**
     * 清除 session
     *
     * @param {Object} res 返回头
     */
    clearSession(res) {
        res.clearCookie(config.authCookieName, {
            path: '/'
        });
    }
};
