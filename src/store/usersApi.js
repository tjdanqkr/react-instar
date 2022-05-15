import { customAxios } from "../http/customAxios";

export const getUserById = async (users, id) => {
    // const findUserById = await users.find((user) => user.id === id);
    const { data } = await customAxios("get", `/user/${id}`);
    return data;
};

export const getUserByUserId = async (users, userId) => {
    const findUserByUserId = await users.find((user) => user.userId === userId);
    return findUserByUserId;
};
export const getUserByKey = async (users, key) => {
    const findUserByUserId = await users.find((user) => key.test(user.name));
    return findUserByUserId;
};

export const postUser = async (users, user) => {
    const { status } = await customAxios("post", "/user/join", user);
    if (status !== 201) {
        throw new Error("error");
    }

    // return [...users, newUser];
};

export const loginApi = async (users, user) => {
    const { data } = await customAxios("post", "/user/login", user);

    return { isLogin: data.token ? true : false, user: data.user, token: data.token };
};

export const checkId = async (users, userId) => {
    const isCheckId = (await users.find((user) => user.userId === userId)) ? true : false;
    return isCheckId;
};

export const logoutApi = async (userId) => {
    return true;
};
export const putUsers = async (users, user, id) => {
    const { data } = await customAxios("put", `/user`, user);
    if (data) {
        return user;
    }
};
