/**
 * @file 站点配置
 */

export default {
    port: 9191,
    db: 'mongodb://127.0.0.1:27017/base_full_stack_project',
    authCookieName: 'token',
    sessionSecret: 'base_full_stack_project' // 务必修改
};
