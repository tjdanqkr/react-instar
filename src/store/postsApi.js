import { customAxios } from "../http/customAxios";

export const getPostById = async (posts, id) => {
    try {
        const { data } = await customAxios("get", `/post/${id}`);
        return data;
    } catch (error) {
        throw error;
    }
};

export const getPostByUserId = async (posts, userId) => {
    try {
        const { data } = await customAxios("get", `/post/user/${userId}`);
        return data;
    } catch (error) {
        throw error;
    }
};
export const getMyPost = async (posts, userId) => {
    try {
        const { data } = await customAxios("get", `/post/my`);
        return data;
    } catch (error) {
        throw error;
    }
};

export const postPost = async (post) => {
    try {
        const { data } = await customAxios("post", "/post", post);
        return data;
    } catch (error) {
        throw error;
    }
};

export const deletePostById = async (id) => {
    const { data } = await customAxios("delete", `/post/${id}`);
    return data;
};
export const getPostByOther = async () => {
    try {
        const { data } = await customAxios("get", "/post/other");
        return data;
    } catch (error) {
        throw error;
    }
};

export const putPost = async (posts, post, id) => {
    try {
        const { data } = await customAxios("put", `/post/${id}`, post);

        return data;
    } catch (error) {
        throw error;
    }
};

export const getPostByKey = async (key) => {
    try {
        const { data } = await customAxios("get", `/post/key/${key}`);
        return data;
    } catch (error) {
        throw error;
    }
};

export const getPostMain = async () => {
    try {
        const { data } = await customAxios("get", "/post/following");
        return data;
    } catch (error) {
        throw error;
    }
};
