/**
 * @file  API路由配置文件
 * @author 小强赵
 */

import {Router} from 'express';
import user from './api/user';
import upload from './api/upload';
import logger from './logger.js';

const router = new Router();
router.all('/*', (req, res, next) => {
    logger.trace(`API request, URL:${req.originalUrl}, method:${req.method}, body:${JSON.stringify(req.body)}`);
    next();
});

// 用户相关部分
router.get('/users', user.getUserList);
router.delete('/users/:id', user.deleteUserItem);
router.post('/users', user.addUserItem);
router.post('/users/login', user.login);
// 系统初始化完成后注释掉此方法
// router.get('/init-root-user', user.initRootUser);

// 独立接口
router.post('/upload', upload);

export default router;
