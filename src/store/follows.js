import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Follow } from "../data/Follow";
import { deleteFollowing, getFollowerByMe, getFollowingByMe, getFollowingByMeOne, postFollower } from "./followsApi";
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
const SELECT_MY_FOLLOWING_ONE = "SELECT_MY_FOLLOWING_ONE";
export const selectMyFollower = createAsyncThunk(SELECT_MY_FOLLOWER, async (payload, thunkAPI) => {
    const myfollows = await getFollowerByMe();
    return myfollows;
});

export const selectMyFollowing = createAsyncThunk(SELECT_MY_FOLLOWERING, async (payload, thunkAPI) => {
    const myfollows = await getFollowingByMe();
    return myfollows;
});

export const deleteFollow = createAsyncThunk(DELETE_FOLLOWING, async (payload, thunkAPI) => {
    return await deleteFollowing(payload);
});

export const insertFollowing = createAsyncThunk(INSERT_FOLLOWING, async (payload, thunkAPI) => {
    const myfollows = await postFollower(payload);
    return myfollows;
});
export const selectMyFollowingOne = createAsyncThunk(SELECT_MY_FOLLOWING_ONE, async (payload, thunkAPI) => {
    const userId = payload;

    const myfollows = await getFollowingByMeOne(userId);
    return myfollows ? true : false;
});

export const followsSlice = createSlice({
    name: "follows",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // .addCase(insertFollowing.fulfilled, (state, { payload }) => {
            //     const newFollows = [...state.follows, payload];
            //     return { ...state, follows: newFollows };
            // })
            // .addCase(insertFollowing.rejected, (state, { error }) => {
            //     return { ...state };
            // })
            // .addCase(deleteFollow.fulfilled, (state, { payload }) => {
            //     return { ...state, follows: payload };
            // })
            // .addCase(deleteFollow.rejected, (state, { error }) => {
            //     return { ...state };
            // })
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
