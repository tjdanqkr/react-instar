import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { Post } from "../data/Post";
import { fileUpload } from "../http/customAxios";
import { selectMyFollower, selectMyFollowing } from "./follows";
import { deletePostById, getMyPost, getPostByKey, getPostByOther, getPostByUserId, getPostMain, postPost } from "./postsApi";
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
    mainPosts: {
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
const SELECT_POST_MAIN = "SELECT_POST_MAIN";

export const selectMyPost = createAsyncThunk(
    SELECT_MY_POST, //
    async (payload, thunkAPI) => {
        const myPosts = await getMyPost();
        return myPosts;
    }
);

export const deletePost = createAsyncThunk(
    DELETE_POST, //
    async (payload, thunkAPI) => {
        await deletePostById(payload);
    }
);

export const selectOtherPost = createAsyncThunk(
    SELECT_OTHER_POST, //
    async (payload, thunkAPI) => {
        const myPosts = await getPostByOther();
        return myPosts;
    }
);

export const selectPostsByKey = createAsyncThunk(
    SELECT_POST_BY_KEY, //
    async ({ searchKey }, thunkAPI) => {
        const myPosts = await getPostByKey(searchKey);
        return myPosts;
    }
);
export const insertPosts = createAsyncThunk(
    INSERT_POST, //
    async (payload, thunkAPI) => {
        let formData = new FormData();
        formData.append("file", payload.file);
        await fileUpload("post", "/upload", formData);
        const removeFilePost = { ...payload, file: "", img: `/${payload.file.name}` };
        await postPost(removeFilePost);
    }
);
export const selectPostMain = createAsyncThunk(
    SELECT_POST_MAIN, //
    async (payload, thunkAPI) => {
        const myPosts = await getPostMain();
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
            })

            .addCase(selectPostMain.pending, (state, { payload }) => {
                const mainPosts = { ...state.mainPosts };
                mainPosts.loading = true;
                return { ...state, mainPosts };
            })
            .addCase(selectPostMain.fulfilled, (state, { payload }) => {
                const mainPosts = { ...state.mainPosts };
                mainPosts.loading = false;
                mainPosts.posts = payload;
                return { ...state, mainPosts };
            })
            .addCase(selectPostMain.rejected, (state, { error }) => {
                const mainPosts = { ...state.mainPosts };
                mainPosts.loading = false;
                mainPosts.message = error.message;
                return { ...state, mainPosts };
            });
    },
});

export default postsSlice.reducer;
