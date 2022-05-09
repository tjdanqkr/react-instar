export const postFollower = async (myId, userId) => {
    try {
        const newFollower = await { following: myId, follower: userId };
        return newFollower;
    } catch (error) {
        throw error;
    }
};
export const deleteFollowing = async (follows, myId, userId) => {
    try {
        const delPosts = await follows.filter(
            (
                follow //
            ) => !(follow.follower === userId && follow.following === myId)
        );
        return [...delPosts];
    } catch (error) {
        throw error;
    }
};
export const getFollowerByMe = async (follows, myId) => {
    try {
        const findFollowerByMe = await follows.filter((follow) => follow.following === myId);
        return findFollowerByMe;
    } catch (error) {
        throw error;
    }
};

export const getFollowingByMe = async (follows, myId) => {
    try {
        const findFollowingByMe = await follows.filter((follow) => follow.follower === myId);
        return findFollowingByMe;
    } catch (error) {
        throw error;
    }
};
