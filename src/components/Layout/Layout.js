import { Outlet } from "react-router-dom";
import { Container } from "reactstrap";
import AuthRouter from "../AuthRouter";
import Menubar from "./Menubar";

const Layout = () => {
    return (
        <>
            <AuthRouter></AuthRouter>
            <Container fluid="md">
                <Outlet />
            </Container>
            <Menubar></Menubar>
        </>
    );
};

export default Layout;
