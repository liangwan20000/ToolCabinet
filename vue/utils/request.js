import axios from 'axios';
// 引入store
import store from '@/store/index.js';
// 引入大数处理
import JSONbig from 'json-bigint';
// 导入router
import router from '@/router/index.js';

const request = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn'
});


// allows changes to the response data to be made before
request.defaults.transformResponse = [function (data) {
    try {
    // data 数据可能不是标准的 JSON 格式字符串，否则会导致 JSONbig.parse(data) 转换失败报错
        return JSONbig.parse(data);
    } catch (err) {
    // 无法转换的数据直接原样返回
        return data;
    }
}];


// 请求拦截器
request.interceptors.request.use((config) => {
    // 设置请求头的Authorization
    const { user } = store.state;
    // 如果用户登录，就有user
    if (user) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
}, (err) => {
    return Promise.reject(err);
});

// 响应拦截器
request.interceptors.response.use((response) => {
    // 处理返回的数据
    return response.data.data || response.data;
}, async (err) => {
    // 判断是否出现401，登录异常（没有登录或者是登录过期）
    if (err.response.status === 401) {
        // 判断是否登录，没有登录跳转到登录页面
        if (!store.state.user) {
            router.push({
                name: 'login'
            });
        }
        try {
            // 如果是登陆过期
            const refreshToken = store.state.user.refresh_token;
            // 发送请求
            const data = await axios({
                method: 'put',
                url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations', // 重新获取token
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                }
            });
            // 重置vuex中user的值
            store.commit('setUser', {
                token: data.data.data.token,
                refresh_token: refreshToken
            });
            // 获得新的token后，继续请求
            return request(err.config);
        } catch (error) {
            // 如果不能重新获取token，跳转到登录页面
            router.push({
                name: 'login'
            });
        }
    }

    return Promise.reject(err);
});

async function service(obj, str) {
  const res = await request(obj);

  if (res.code >= 200 && res.code < 300) {
    return res[str];
  } else {
    return undefined;
  }
}

// export function publicAddress(data, str) {
//   return requestTwo({
//     url: '/public/address',
//     method: 'get',
//     params: data
//   }, str)
// }

export default service;
