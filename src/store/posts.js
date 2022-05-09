import { createSlice } from "@reduxjs/toolkit";
import { Post } from "../data/Post";

export const postsSlice = createSlice({
    name: "posts",
    initialState: {
        posts: Post,
    },
    reducers: {
        findMyPost: (state) => {
            const myId = Number(localStorage.getItem("id"));
            return state.posts.filter((post) => post.userId === myId);
        },
        insertPost: (state, action) => {},
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = postsSlice.actions;

export default postsSlice.reducer;
