import { customAxios } from "../http/customAxios";

export const postFollower = async (userId) => {
    try {
        // const newFollower = await { follower: myId, following: userId };
        const { data } = await customAxios("post", `/follow/${userId}`);
        return data;
    } catch (error) {
        throw error;
    }
};
export const deleteFollowing = async (userId) => {
    try {
        const { data } = await customAxios("delete", `/follow/${userId}`);

        return data;
    } catch (error) {
        throw error;
    }
};
export const getFollowerByMe = async () => {
    try {
        const { data } = await customAxios("get", "/follow/my/follower");
        return data;
    } catch (error) {
        throw error;
    }
};

export const getFollowingByMe = async () => {
    try {
        const { data } = await customAxios("get", "/follow/my/following");
        return data;
    } catch (error) {
        throw error;
    }
};

export const getFollowingByMeOne = async (userId) => {
    try {
        const { data } = await customAxios("get", `/follow/follower/${userId}`);
        return data.length === 0 ? false : true;
    } catch (error) {
        throw error;
    }
};
