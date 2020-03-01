// 引入vue实例
import Vue from 'vue';
// 引入dayjs
import dayjs from 'dayjs';
// 引入dayjs的具体模块
import relativeTime from 'dayjs/plugin/relativeTime.js';
// 引入语言模块
import 'dayjs/locale/zh-cn';
// 配置dayjs插件
dayjs.extend(relativeTime);
// dayjs语言本地化
dayjs.locale('zh-cn');

// 全局过滤器
Vue.filter('fltime', (value) => {
    return dayjs().to(dayjs(value));
});
