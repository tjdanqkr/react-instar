import { Button } from "reactstrap";
import "./Login.css";

const Login = () => {
    return (
        <div className="LoginPage">
            <div className="Box">
                <div className="imgBox">
                    <img src="https://www.instagram.com/static/images/web/logged_out_wordmark-2x.png/d2529dbef8ed.png" alt="Logo"></img>
                </div>
                <div className="LoginBox">
                    <input type="text" placeholder="Id"></input>
                    <input type="password" placeholder="Password"></input>
                    <Button color="primary">로그인</Button>
                </div>
            </div>
            <div className="Box">
                <p>
                    계정이 없으신가요? <a href="/join">가입하기</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
