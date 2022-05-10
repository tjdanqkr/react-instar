export const postFollower = async (myId, userId) => {
    try {
        const newFollower = await { follower: myId, following: userId };
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
            ) => !(follow.follower === myId && follow.following === userId)
        );

        return delPosts;
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

export const getFollowingByMeOne = async (follows, myId, userId) => {
    try {
        const findFollowingByMe = await follows.find(
            (
                follow //
            ) => {
                return follow.following === userId && follow.follower === myId;
            }
        );
        return findFollowingByMe;
    } catch (error) {
        throw error;
    }
};
