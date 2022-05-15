import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Join from "./components/Join/Join";
import BootstrapLogin from "./components/Login/BootstrapLogin";
import { Users } from "./data/User";
import Main from "./components/Main/Main";
import Page404 from "./components/Page404";
import { UserContext } from "./store/UserContext";
import Layout from "./components/Layout/Layout";
import Profile from "./components/Profile/Profile";
import { Post } from "./data/Post";
import { PostContext } from "./store/PostContext";
import { Follow } from "./data/Follow";
import { FollowContext } from "./store/FollowContext";
import Search from "./components/Search/Search";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout></Layout>}>
                    <Route index element={<Main></Main>}></Route>
                    <Route path="shopping" element={<Main></Main>}></Route>
                    <Route path="profile" element={<Profile></Profile>}></Route>
                    <Route path="search" element={<Search></Search>}></Route>
                </Route>
                <Route path="/login" element={<BootstrapLogin></BootstrapLogin>}></Route>
                <Route path="/join" element={<Join></Join>}></Route>
                <Route path="/*" element={<Page404></Page404>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
