/**
 * @file  API路由配置文件
 * @author 小强赵
 */

import {Router} from 'express';
import user from './api/user';
import upload from './api/upload';
import logger from './logger';
import auth from './middlewares/auth';

const router = new Router();
// API 接口调用日志
router.all('/*', (req, res, next) => {
    logger.trace(`API request, URL:${req.originalUrl}, method:${req.method}, body:${JSON.stringify(req.body)}`);
    next();
});

// 用户相关部分
router.get('/users', auth.adminRequired, user.getUserList);
router.get('/users/current', auth.userRequired, user.getCurrentUser);
router.delete('/users/:id', auth.adminRequired, user.deleteUserItem);
router.post('/users', auth.adminRequired, user.addUserItem);
router.post('/users/signin', user.signin);
router.post('/users/signout', user.signout);
// 系统初始化完成后注释掉此方法
// router.get('/init-root-user', user.initRootUser);

// 独立接口
router.post('/upload', upload);

export default router;
