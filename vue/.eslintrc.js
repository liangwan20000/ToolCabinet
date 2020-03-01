module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    rules: {
        'semi': ['error', 'always'],      // 禁用限制分号
        'no-multiple-empty-lines': ['error', {'max': 2 }],  // 空白行允许出现2个
        'no-tabs': 'off',   // 不限制逗号后的空格
        'indent': ['error', 4],     // 设置缩进为4个空格
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}