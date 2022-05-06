import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import AuthRouter from "./components/AuthRouter";
import Join from "./components/Join/Join";
import BootstrapLogin from "./components/Login/BootstrapLogin";
import { Users } from "./components/Login/User";
import Main from "./components/Main";
import Page404 from "./components/Page404";
import { UserContext } from "./store/UserContext";

function App() {
    const [users, setUsers] = useState(Users);
    const insertUsers = (user) => {
        const newUser = { ...user, userId: user.id, id: users.length };
        setUsers([...users, newUser]);
    };

    return (
        <UserContext value={(users, insertUsers)}>
            <BrowserRouter>
                <Routes>
                    <Route index path="/" element={<Main></Main>}></Route>
                    <Route path="/login" element={<BootstrapLogin></BootstrapLogin>}></Route>
                    <Route path="/join" element={<Join></Join>}></Route>
                    <Route path="/*" element={<Page404></Page404>}></Route>
                </Routes>
            </BrowserRouter>
        </UserContext>
    );
}

export default App;
