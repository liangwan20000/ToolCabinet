module.exports = {
    presets: [
        '@vue/app',
        '@vue/cli-plugin-babel/preset',
        '@babel/preset-env'
    ],
    // 配置使保存时根据配置自动格式化
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
