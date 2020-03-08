module.exports = {
    presets: [
        '@vue/app',
        '@vue/cli-plugin-babel/preset',
        '@babel/preset-env' //  babel 的降级处理配置
    ],
    plugins: [ // 按需引入element-ui样式的配置
        [
            'component',
            {
                'libraryName': 'element-ui',
                'styleLibraryName': 'theme-chalk'
            }
        ]
    ]
};
