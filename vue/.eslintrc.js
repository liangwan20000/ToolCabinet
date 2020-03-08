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
        'eol-last': ['error', 'never'], // 要求末尾有空行
        'semi': ['error', 'always'], // 禁用限制分号
        'quotes': ["error", "double", { "avoidEscape": true }], // 单独时使用双引号 单引号套双引号
        'no-multiple-empty-lines': ['error', { 'max': 2 }], // 空白行允许出现2个
        'no-trailing-spaces': ['error', { "skipBlankLines": false }], // 禁止在空行使用空白符
        'semi': ['error', 'always'], // 禁用限制分号
        'no-tabs': ["error", { allowIndentationTabs: true }], // 不限制逗号后的空格
        'indent': ['error', 4], // 4个空格的缩进
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}