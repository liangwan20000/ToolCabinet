// 操作本地存储，把读写用户信息封装

export const setUser = (user) => {
    window.localStorage.setItem('user', JSON.stringify(user));
};

export const getUser = (user) => {
    return JSON.parse(window.localStorage.getItem('user'));
};

export const removeUser = (user) => {
    return window.localStorage.removeItem('user');
};
