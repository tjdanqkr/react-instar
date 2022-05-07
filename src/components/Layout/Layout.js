import { Outlet } from "react-router-dom";
import AuthRouter from "../AuthRouter";
import Menubar from "./Menubar";

const Layout = () => {
    return (
        <div>
            <AuthRouter></AuthRouter>

            <Outlet />

            <Menubar></Menubar>
        </div>
    );
};

export default Layout;
