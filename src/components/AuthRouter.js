import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Users } from "./Login/User";

const AuthRouter = () => {
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const id = localStorage.getItem("id");
        const findUser = Users.find((data) => data.id === Number(id));
        if (!findUser) {
            const from =
                location.pathname === "/login" || location.pathname === "/join" //
                    ? location.pathname
                    : "/login";
            navigate(from);
        } else {
            const from = location.pathname || "/";
            navigate(from === "/login" || from === "/join" ? "/" : from);
        }
    }, []);
    return <></>;
};

export default AuthRouter;
