// 操作本地存储，把读写用户信息封装

export const setUser = (value) => {
    window.localStorage.setItem(value.name, JSON.stringify(value.data));
};

export const getUser = (user) => {
    return JSON.parse(window.localStorage.getItem(user));
};

export const removeUser = (user) => {
    return window.localStorage.removeItem(user);
};
