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
    }
};
