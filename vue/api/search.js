// 引入请求模块
import request from '@/utils/request.js';

/**
 * 获取搜索建议
 *
 */
export const get = (q) => {
    return request.get('/app/v1_0/suggestion', {
        params: {
            q
        }
    });
};

/**
 * 获取搜索结果
 */

export const getsearchresults = ({
    page,
    perPage,
    q
}) => {
    return request.get('/app/v1_0/search', {
        params: {
            page: page,
            per_pge: perPage,
            q: q
        }
    });
};

/**
 * 获取用户搜索历史
 */

export const getHistoricalRecords = () => {
    return request.get('/app/v1_0/search/histories');
};
