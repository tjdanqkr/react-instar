import "./Menubar.css";
import { AiFillHome, AiOutlineSearch, AiOutlineShopping, AiOutlineVideoCamera } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { Col, Container, Row } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
const Menubar = () => {
    const location = useLocation();
    return (
        <div className="Menubar">
            <Row className="MenuContainer">
                <Col className="Icon">
                    <Link to={"/"}>
                        <AiFillHome size={30} fill={location.pathname === "/" ? "blue" : "black"}></AiFillHome>
                    </Link>
                </Col>
                <Col className="Icon">
                    <Link to="/search">
                        <AiOutlineSearch size={30} fill={location.pathname === "/search" ? "blue" : "black"}></AiOutlineSearch>
                    </Link>
                </Col>
                <Col className="Icon">
                    <Link to="/camera">
                        <AiOutlineVideoCamera size={30} fill={location.pathname === "/camera" ? "blue" : "black"}></AiOutlineVideoCamera>
                    </Link>
                </Col>
                <Col className="Icon">
                    <Link to="/shopping">
                        <AiOutlineShopping size={30} fill={location.pathname === "/shopping" ? "blue" : "black"}></AiOutlineShopping>
                    </Link>
                </Col>
                <Col className="Icon">
                    <Link to="/profile">
                        <BiUserCircle size={30} fill={location.pathname === "/profile" ? "blue" : "black"}></BiUserCircle>
                    </Link>
                </Col>
            </Row>
        </div>
    );
};

export default Menubar;
