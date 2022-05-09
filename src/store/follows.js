import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Follow } from "../data/Follow";
import { deleteFollowing, getFollowerByMe, getFollowingByMe, postFollower } from "./followsApi";
const initialState = {
    follows: Follow,
    myFollowing: {
        follows: [],
        loading: false,
        message: "",
    },
    myFollower: {
        follows: [],
        loading: false,
        message: "",
    },
};

const SELECT_MY_FOLLOWER = "SELECT_MY_FOLLOWER";
const SELECT_MY_FOLLOWERING = "SELECT_MY_FOLLOWERING";
const DELETE_FOLLOWING = "DELETE_FOLLOWING";
const INSERT_FOLLOWING = "INSERT_FOLLOWING";

export const selectMyFollower = createAsyncThunk(SELECT_MY_FOLLOWER, async (payload, thunkAPI) => {
    const { myId } = thunkAPI.getState().users;
    const { follows } = thunkAPI.getState().follows;
    if (myId) {
        const myfollows = await getFollowerByMe(follows, Number(myId));
        return myfollows;
    } else if (myId === 0 || myId === "0") {
        const myfollows = await getFollowerByMe(follows, Number(myId));
        return myfollows;
    }
    return;
});

export const selectMyFollowing = createAsyncThunk(SELECT_MY_FOLLOWERING, async (payload, thunkAPI) => {
    const { myId } = thunkAPI.getState().users;
    const { follows } = thunkAPI.getState().follows;
    if (myId) {
        const myfollows = await getFollowingByMe(follows, Number(myId));
        return myfollows;
    } else if (myId === 0 || myId === "0") {
        const myfollows = await getFollowingByMe(follows, Number(myId));
        return myfollows;
    }
    return;
});

export const deleteFollow = createAsyncThunk(DELETE_FOLLOWING, async (payload, thunkAPI) => {
    const { follows } = thunkAPI.getState().follows;
    const { myId } = thunkAPI.getState().users;
    return deleteFollowing(follows, myId, payload);
});

export const insertFollowing = createAsyncThunk(INSERT_FOLLOWING, async (payload, thunkAPI) => {
    const { myId } = thunkAPI.getState().users;
    if (myId) {
        const myfollows = await postFollower(Number(myId), payload);
        return myfollows;
    } else if (myId === 0 || myId === "0") {
        const myfollows = await postFollower(Number(myId), payload);
        return myfollows;
    }
    return;
});

export const followsSlice = createSlice({
    name: "follows",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(insertFollowing.fulfilled, (state, { payload }) => {
                const newFollows = [...state.follows, payload];
                return { ...state, follows: newFollows };
            })
            .addCase(insertFollowing.rejected, (state, { error }) => {
                return { ...state };
            })
            .addCase(deleteFollow.fulfilled, (state, { payload }) => {
                const newFollows = [...state.follows, payload];
                return { ...state, follows: newFollows };
            })
            .addCase(deleteFollow.rejected, (state, { error }) => {
                return { ...state };
            })
            .addCase(selectMyFollower.pending, (state, { payload }) => {
                const newMyFollower = { ...state.myFollower };
                newMyFollower.loading = true;
                return { ...state, myFollower: newMyFollower };
            })
            .addCase(selectMyFollower.fulfilled, (state, { payload }) => {
                const newMyFollowers = { ...state.myFollower };
                newMyFollowers.loading = false;
                if (payload) {
                    newMyFollowers.follows = payload;
                    return { ...state, myFollower: newMyFollowers };
                } else {
                    return { ...state, myFollower: newMyFollowers };
                }
            })
            .addCase(selectMyFollower.rejected, (state, { error }) => {
                const newMyFollowers = { ...state.myFollower };
                newMyFollowers.loading = false;
                newMyFollowers.message = error.message;
                return { ...state, myFollower: newMyFollowers };
            })
            .addCase(selectMyFollowing.pending, (state, { payload }) => {
                const newFollowing = { ...state.myFollowing };
                newFollowing.loading = true;
                return { ...state, myFollowing: newFollowing };
            })
            .addCase(selectMyFollowing.fulfilled, (state, { payload }) => {
                const newFollowing = { ...state.myFollowing };
                newFollowing.loading = false;
                if (payload) {
                    newFollowing.follows = payload;
                    return { ...state, myFollowing: newFollowing };
                } else {
                    return { ...state, myFollowing: newFollowing };
                }
            })
            .addCase(selectMyFollowing.rejected, (state, { error }) => {
                const newFollowing = { ...state.myFollowing };
                newFollowing.loading = false;
                newFollowing.message = error.message;
                return { ...state, myFollowing: newFollowing };
            });
    },
});

export default followsSlice.reducer;
