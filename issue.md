# 服务器端渲染时丢 cookie

## 问题描述

我用 Nuxt 和 express 搭配实现服务端渲染, 在 .vue 文件中代码如下:

```js
async asyncData(req) {
    const res = await axios.get('/api/users', null, {
         withCredentials: true
    });
}
```
在浏览器中直接访问是能拿到数据的，地址像这样：http://172.24.140.50:9191/api/users, 但是正和岛页面中用服务端渲染就不行了，我这个接口需要一个登录后的 token，也就是一个服务端只读 cookie，我这这样排查的：

```js
async asyncData(req) {
    console.log('index.vue signedCookies:', req.req.signedCookies[config.authCookieName]);
   // 这里可以拿到正确的 signedCookies
    const res = await axios.get('/api/users', null, {
         withCredentials: true
    });
}
```
但是在 nodejs 服务端就不行了，“/api/users” 对应的 nodejs 代码是这样的:

```js
getUserList(req, res) {
     console.log('api-user token: ', req.signedCookies);
    // it lost signedCookies
}
```

express 的 router 这样设置的:

```js
router.get('/api/users', user.getUserList);
```

怎么解决呢，有思路吗？

It trabbled me, hoe can i get the signedCookies in nodejs server side?

https://cmty.app/nuxt/nuxt.js/issues/c7585

## 问题定位

浏览器会自动维护 cookie，但在 node 里，在前一个请求执行成功的回调函数里再发一个请求，这时请求头不会被自动带到下一个，这其中也包括 cookie，也就是说 node 不帮你自动维护 cookie，你需要自己来。

## 问题解决

在业务代码里直接使用 axios 提供的 API 可以做这个事情，先获取再赋值：
```js
async asyncData({req}) {
    if (process.server) {
        axios.defaults.headers.common.cookie = req.headers.cookie;
    }

    let tableData;
    try {
        const res = await axios.get('/api/users');
        tableData = res.data;
    }
    catch (e) {
        tableData = [];
    }

    return {
        tableData
    };
},
```

还有一种框架记得解决方案，添加 Express 中间件，页面请求为接口请求预置 cookie：

```js
// server/middlewares/ssr-cookie.js
import axios from '../../plugins/axios.js';

export default function (req, res, next) {
    const filter = [
        '/_nuxt',
        '/api'
    ];

    const isMatched = filter.some(item => {
        if (req.url.indexOf(item) === 0) {
            return true;
        }
    });

    // 静态资源和 API不需要设置 coolie，其实只有 asyncData 方法中调用接口前需要预置 cookie
    // (页面请求为接口请求预置 cookie)
    if (!isMatched) {
        axios.defaults.headers.common.cookie = req.headers.cookie;
    }

    next();
}
```

在 Express 入口处添加中间件就可以了，不用再每个业务代码里写重复代码。

```js
import express from 'express';
const app = express();
app.use(ssrCookie);
```
