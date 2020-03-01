// 引入请求模块
import request from '@/utils/request.js';

// 封装请求方法
/**
 * 获取频道列表
 * 未登录：获取默认的列表
 * 已登录：请求头携带Authorization
 */
export const getChannels = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/user/channels'
    });
};

/**
 * 查询所有频道
 */
export const getAllChannels = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/channels'
    });
};

/**
 * 重置用户频道
 */
export const resetUserChannels = (channels) => {
    return request.put('/app/v1_0/user/channels', {
        channels
    });
};

/**
 * 删除指定频道
 */
export const deleteUserChannels = (id) => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/user/channels/${id}`
    });
};
