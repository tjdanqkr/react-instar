import { configureStore, combineReducers } from "@reduxjs/toolkit";

import users from "./users";
import posts from "./posts";
const reducer = combineReducers({
    users,
    posts,
});
export default configureStore({
    reducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
});
