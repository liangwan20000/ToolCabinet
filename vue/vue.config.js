module.exports = {
    // 处理路径
    publicPath: './',
    lintOnSave: true, // 在保存代码的时候开启eslint代码检查机制
    devServer: { // 实时保存/编译的配置段
        open: true, // 自动开启浏览器
        host: '127.0.0.1', // 服务主机名
        port: 12306 // 服务运行端口
    },
    // externals优化需要的配置
    configureWebpack: config => {
        // 配置 externals
        // 防止将某些 import 的包(package)打包到 bundle 中，
        // 而是在运行时(runtime)再去从外部获取这些扩展依赖
        config.externals = {
            // 包名(from后边的名字): 构造函数名称(文件内部提供的全局变量名字)
            vue: 'Vue',
            axios: 'axios',
            'vue-router': 'VueRouter',
            echarts: 'echarts',
            nprogress: 'NProgress',
            vuex: 'Vuex'
        };
    },
    // 去除eslint错误
    chainWebpack: config => {
        // config.resolve.symlinks(true); // 热更新
        config.module.rules.delete('eslint'); // 禁止eslint检查
    }
};
module.exports = {
    /* 部署生产环境和开发环境下的URL：可对当前环境进行区分，baseUrl 从 Vue CLI 3.3 起已弃用，要使用publicPath */ 
    /* baseUrl: process.env.NODE_ENV === 'production' ? './' : '/' */
    publicPath: process.env.NODE_ENV === 'production' ? '/public/' : './',
    /* 输出文件目录：在npm run build时，生成文件的目录名称 */
    outputDir: 'dist',
    /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
    assetsDir: "assets",
    /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
    productionSourceMap: false,
    /* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
    filenameHashing: false,
    /* 代码保存时进行eslint检测 */
    lintOnSave: true,
    /* webpack-dev-server 相关配置 */
    devServer: {
        /* 自动打开浏览器 */
        open: true,
        /* 设置为0.0.0.0则所有的地址均能访问 */
        host: '0.0.0.0',
        port: 8066,
        https: false,
        hotOnly: false,
        /* 使用代理 */
        proxy: {
            '/api': {
                /* 目标代理服务器地址 */
                target: 'http://47.100.47.3/',
                /* 允许跨域 */
                changeOrigin: true,
            },
        },
    },
}