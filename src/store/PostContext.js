import { createContext } from "react";

export const PostContext = createContext({
    posts: [],
    insertPost: (post) => {},
    deletePost: (postId) => {},
});
