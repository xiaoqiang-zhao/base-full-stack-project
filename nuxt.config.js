/**
 * @file nuxt 配置文件
 * @author 小强赵
 */

module.exports = {
    // Headers of the page
    head: {
        title: '基础全栈项目',
        meta: [{
                charset: 'utf-8'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: '基础全栈项目'
            }
        ],
        link: [{
            rel: 'icon',
            type: 'image/x-icon',
            href: '/favicon.ico'
        }]
    },
    // Global CSS
    css: ['~assets/css/main.css'],
    // Customize the progress-bar color
    loading: {
        color: '#3B8070'
    },
    // Build configuration
    build: {
        vendor: ['axios']
    },
    srcDir: 'client/'
};
