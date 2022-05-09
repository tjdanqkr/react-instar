export const getPostById = async (posts, id) => {
    try {
        const findPostById = await posts.filter((post) => post.id === id);
        return findPostById;
    } catch (error) {
        throw error;
    }
};

export const getPostByUserId = async (posts, userId) => {
    try {
        const findPostsByUserId = await posts.filter((post) => post.userId === userId);

        return findPostsByUserId;
    } catch (error) {
        throw error;
    }
};

export const postPost = async (posts, post) => {
    try {
        const newPost = { ...post, id: posts.length };
        return [...posts, newPost];
    } catch (error) {
        throw error;
    }
};

export const deletePostById = async (posts, id) => {
    const delPosts = await posts.filter((post) => post.id !== id);
    return [...delPosts];
};
export const getPostByOther = async (posts, userId) => {
    try {
        const findPostsByUserId = await posts.filter((post) => post.userId !== userId);
        return findPostsByUserId;
    } catch (error) {
        throw error;
    }
};

export const putPost = async (posts, post, id) => {
    try {
        const findPostIndex = await posts.findIndex((post) => post.id === id);
        const { content, img } = post;
        if (findPostIndex === -1) {
            return new Error("index not found");
        }
        const newposts = [...posts];
        newposts.splice(findPostIndex, 1, { ...posts[findPostIndex], content, img });
        return newposts;
    } catch (error) {
        throw error;
    }
};

export const getPostByKey = async (posts, key, userId) => {
    try {
        const findPostsByUserId = await posts.filter(
            (
                post //
            ) => userId === post.userId || key.test(post.content)
        );
        return findPostsByUserId;
    } catch (error) {
        throw error;
    }
};
