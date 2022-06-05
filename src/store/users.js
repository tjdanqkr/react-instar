import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Users } from "../data/User";
import { fileUpload } from "../http/customAxios";
import { checkId, getUserById, getUserByKey, getUserByUserId, loginApi, logoutApi, postUser, putUsers } from "./usersApi";
const initialState = {
    users: Users,
    myId: localStorage.getItem("id"),
    isLogin: localStorage.getItem("id") === undefined ? true : false,
    me: {},
};

const CHECK_ID = "CHECK_ID";
const LOGIN_CHECK = "LOGIN_CHECK";
const LOGIN = "LOGIN";
const INSERT_USER = "INSERT_USER";
const SELECT_USER_BY_ID = "SELECT_USER_BY_ID";
const SELECT_USER_BY_USERID = "SELECT_USER_BY_USERID";
const LOGOUT = "LOGOUT";
const UPDATE_USERS = "UPDATE_USERS";
const SELECT_USER_BY_KEY = "SELECT_USER_BY_KEY";

export const getCheckId = createAsyncThunk(CHECK_ID, async (userId, thunkAPI) => {
    const { users } = thunkAPI.getState().users;
    return await checkId(users, userId);
});
export const loginCheck = createAsyncThunk(LOGIN_CHECK, async (payload, thunkAPI) => {
    const { users, myId } = thunkAPI.getState().users;
    if (myId) {
        const me = await getUserById(users, Number(myId));
        return me;
    } else if (myId === 0 || myId === "0") {
        const me = await getUserById(users, Number(myId));
        return me;
    }
    return;
});
export const login = createAsyncThunk(LOGIN, async (user, thunkAPI) => {
    const { users } = thunkAPI.getState().users;
    const isLogin = await loginApi(users, user);
    return isLogin;
});
export const insertUser = createAsyncThunk(INSERT_USER, async (user, thunkAPI) => {
    const { users } = thunkAPI.getState().users;
    await postUser(users, user);
    // return newUser;
});
export const selectUserById = createAsyncThunk(SELECT_USER_BY_ID, async (id, thunkAPI) => {
    const { users } = thunkAPI.getState().users;
    const newUser = await getUserById(users, id);
    return newUser;
});

export const selectUserByUserId = createAsyncThunk(SELECT_USER_BY_USERID, async (userId, thunkAPI) => {
    const { users } = thunkAPI.getState().users;
    const newUser = await getUserByUserId(users, userId);
    return newUser;
});

export const logout = createAsyncThunk(LOGOUT, async (payload, thunkAPI) => {
    const { myId } = thunkAPI.getState().users;
    const isLogout = await logoutApi(myId);
    return isLogout;
});
export const updateUsers = createAsyncThunk(UPDATE_USERS, async (user, thunkAPI) => {
    const { myId, users } = thunkAPI.getState().users;
    let formData = new FormData();
    if (user.file) {
        formData.append("file", user.file);
        await fileUpload("post", "/upload", formData);
    }
    const removeFileUser = { ...user, file: "", img: user.file ? `/img/${user.file.name}` : user.img };
    await putUsers(users, removeFileUser, myId);
    return { removeFileUser };
});
export const selectUserByKey = createAsyncThunk(SELECT_USER_BY_KEY, async (key, thunkAPI) => {
    const { users } = thunkAPI.getState().users;
    const reg = new RegExp(key, "g");
    const newUsers = await getUserByKey(users, reg);

    return newUsers.id;
});

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginCheck.fulfilled, (state, { payload }) => {
                if (payload) {
                    return { ...state, isLogin: true, me: payload };
                } else {
                    return { ...state, isLogin: false };
                }
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                if (payload.isLogin) {
                    localStorage.setItem("id", payload.user.id);
                    localStorage.setItem("token", payload.token);
                    return {
                        ...state,
                        isLogin: payload.login, //
                        me: payload.user,
                        myId: payload.user.id,
                    };
                } else {
                    return { ...state, isLogin: false };
                }
            })
            // .addCase(insertUser.fulfilled, (state, { payload }) => {
            //     return { ...state, users: payload };
            // })
            .addCase(logout.fulfilled, (state, { payload }) => {
                localStorage.removeItem("id");
                localStorage.removeItem("token");
                return { ...state, isLogin: false, me: {}, myId: "" };
            })
            .addCase(updateUsers.fulfilled, (state, { payload }) => {
                // const { newUsers, user } = payload;
                // return {  me: { ...state.me, ...user }, users: newUsers };
                return { ...state, me: payload.removeFileUser };
            });
    },
});

export default usersSlice.reducer;
