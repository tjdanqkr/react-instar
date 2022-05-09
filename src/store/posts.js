import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Post } from "../data/Post";
import { deletePostById, getPostByKey, getPostByOther, getPostByUserId } from "./postsApi";
const initialState = {
    posts: Post,
    myPosts: {
        posts: [],
        loading: false,
        message: "",
    },
    otherPosts: {
        posts: [],
        loading: false,
        message: "",
    },
};

const SELECT_MY_POST = "SELECT_MY_POST";
const SELECT_OTHER_POST = "SELECT_OTHER_POST";
const UPDATE_POST = "UPDATE_POST";
const DELETE_POST = "DELETE_POST";
const INSERT_POST = "INSERT_POST";
const SELECT_POST_BY_KEY = "SELECT_POST_BY_KEY";

export const selectMyPost = createAsyncThunk(SELECT_MY_POST, async (payload, thunkAPI) => {
    const { myId } = thunkAPI.getState().users;
    const { posts } = thunkAPI.getState().posts;
    if (myId) {
        const myPosts = await getPostByUserId(posts, Number(myId));
        return myPosts;
    } else if (myId === 0 || myId === "0") {
        const myPosts = await getPostByUserId(posts, Number(myId));
        return myPosts;
    }
    return;
});

export const deletePost = createAsyncThunk(DELETE_POST, async (payload, thunkAPI) => {
    const { posts } = thunkAPI.getState().posts;

    return deletePostById(posts, payload);
});

export const selectOtherPost = createAsyncThunk(SELECT_OTHER_POST, async (payload, thunkAPI) => {
    const { myId } = thunkAPI.getState().users;
    const { posts } = thunkAPI.getState().posts;
    if (myId) {
        const myPosts = await getPostByOther(posts, Number(myId));
        return myPosts;
    } else if (myId === 0 || myId === "0") {
        const myPosts = await getPostByOther(posts, Number(myId));
        return myPosts;
    }
    return;
});
export const selectPostsByKey = createAsyncThunk(
    SELECT_POST_BY_KEY, //
    async ({ searchKey, userId }, thunkAPI) => {
        const reg = new RegExp(searchKey, "g");
        const { posts } = thunkAPI.getState().posts;
        const myPosts = await getPostByKey(posts, reg, userId);
        return myPosts;
    }
);

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(selectMyPost.pending, (state, { payload }) => {
                const newMyPosts = { ...state.myPosts };
                newMyPosts.loading = true;
                return { ...state, myPosts: newMyPosts };
            })
            .addCase(selectMyPost.fulfilled, (state, { payload }) => {
                const newMyPosts = { ...state.myPosts };
                newMyPosts.loading = false;
                if (payload) {
                    newMyPosts.posts = payload;
                    return { ...state, myPosts: newMyPosts };
                } else {
                    newMyPosts.message = "글이 없습니다.";
                    return { ...state, myPosts: newMyPosts };
                }
            })
            .addCase(selectMyPost.rejected, (state, { error }) => {
                const newMyPosts = { ...state.myPosts };
                newMyPosts.loading = false;
                newMyPosts.message = error.message;
                return { ...state, myPosts: newMyPosts };
            })
            .addCase(deletePost.fulfilled, (state, { payload }) => {
                return { ...state, posts: payload };
            })
            .addCase(selectOtherPost.pending, (state, { payload }) => {
                const newOtherPosts = { ...state.otherPosts };
                newOtherPosts.loading = true;
                return { ...state, otherPosts: newOtherPosts };
            })
            .addCase(selectOtherPost.fulfilled, (state, { payload }) => {
                const newOtherPosts = { ...state.otherPosts };
                newOtherPosts.loading = false;
                if (payload) {
                    newOtherPosts.posts = payload;
                    return { ...state, otherPosts: newOtherPosts };
                } else {
                    newOtherPosts.message = "글이 없습니다.";
                    return { ...state, otherPosts: newOtherPosts };
                }
            })
            .addCase(selectOtherPost.rejected, (state, { error }) => {
                const newOtherPosts = { ...state.otherPosts };
                newOtherPosts.loading = false;
                newOtherPosts.message = error.message;
                return { ...state, otherPosts: newOtherPosts };
            })
            .addCase(selectPostsByKey.pending, (state, { payload }) => {
                const newOtherPosts = { ...state.otherPosts };
                newOtherPosts.loading = true;
                return { ...state, otherPosts: newOtherPosts };
            })
            .addCase(selectPostsByKey.fulfilled, (state, { payload }) => {
                const newOtherPosts = { ...state.otherPosts };
                newOtherPosts.loading = false;
                if (payload) {
                    newOtherPosts.posts = payload;
                    return { ...state, otherPosts: newOtherPosts };
                } else {
                    newOtherPosts.message = "글이 없습니다.";
                    return { ...state, otherPosts: newOtherPosts };
                }
            })
            .addCase(selectPostsByKey.rejected, (state, { error }) => {
                const newOtherPosts = { ...state.otherPosts };
                newOtherPosts.loading = false;
                newOtherPosts.message = error.message;
                return { ...state, otherPosts: newOtherPosts };
            });
    },
});

export default postsSlice.reducer;
