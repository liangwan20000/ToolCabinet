import request from '@/utils/request.js';

export const login = ({ mobile, code }) => {
    return request.post('/app/v1_0/authorizations', {
        mobile, code
    });
};
// 拉黑作者
export const blackUserList = (id) => {
    return request.post('/app/v1_0/user/blacklists', {
        target: id
    });
};

/**
 * 关注用户
 */
export const UnFollowUser = (id) => {
    return request.post('/app/v1_0/user/followings', {
        target: id
    });
};
/**
 * 取消关注用户
 */
export const followUser = (id) => {
    return request.delete(`/app/v1_0/user/followings/${id}`);
};

/**
 * 刷新token
 */

export const getToken = (refreshToken) => {
    return request.put('/app/v1_0/authorizations');
};

/**
 * 获取用户个人资料
 */
export const getUserProfile = () => {
    return request.get('/app/v1_0/user/profile');
};

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
    return request.get('/app/v1_0/user');
};

/**
 * 编辑用户头像资料
 */
export const getUserData = (name, file) => {
    // 提交图片用formdata
    const formData = new FormData();
    // 把要发送的参数放入formData
    formData.append(name, file);
    return request.patch('/app/v1_0/user/photo', formData);
};
