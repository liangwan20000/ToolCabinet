// 获取当前路由中的查询字符串，如果有就做redirect跳转
// 如果没有跳转到首页
this.$router.push({
    path: this.$route.query.redirect || '/layout'
});

// 给vue实例添加延时器
Vue.prototype.$sleep = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => { resolve(); }, time);
    });
};

// 循环注册过滤器
import * as filters from './filters/'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 文章详情
{
    path: '/article/:id',
    name: 'article',
    // 开启路由传参
    props: true,
    component: () => import(/* webpackChunkName: "article" */ '@/views/article/index.vue')
},