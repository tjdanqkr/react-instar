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
    const [users, setUsers] = useState(Users);
    const insertUsers = (user) => {
        const newUser = { ...user, userId: user.id, id: users.length };
        setUsers([...users, newUser]);
    };
    const updateUsers = (user) => {
        const id = Number(localStorage.getItem("id"));
        const { img, name } = user;
        const findUsersIndex = users.findIndex((user) => user.id === id);
        if (findUsersIndex === -1) {
            console.error("not found");
            return;
        }
        const newUsers = [...users];
        newUsers.splice(findUsersIndex, 1, { ...users[findUsersIndex], name, img });
        setUsers(newUsers);
    };
    const [posts, setPosts] = useState(Post);
    const insertPost = (post) => {
        const newPost = { ...post, userId: Number(localStorage.getItem("id")), id: posts.length };
        setPosts([...posts, newPost]);
    };
    const deletePost = (postId) => {
        const delPosts = posts.filter((post) => post.id !== postId);
        setPosts(delPosts);
    };
    const [follows, setFollows] = useState(Follow);
    const insertFollow = (followerId) => {
        const newFollow = { following: Number(localStorage.getItem("id")), follower: followerId };
        setFollows([...follows, newFollow]);
    };

    return (
        <UserContext.Provider value={{ users, insertUsers, updateUsers }}>
            <PostContext.Provider value={{ posts, insertPost, deletePost }}>
                <FollowContext.Provider value={{ follows, insertFollow }}>
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
                </FollowContext.Provider>
            </PostContext.Provider>
        </UserContext.Provider>
    );
}

export default App;
