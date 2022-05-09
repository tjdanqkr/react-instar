import { AiOutlineMenu } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { GoDiffAdded } from "react-icons/go";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { logout } from "../../store/users";
import "./ProfileHeader.css";
const ProfileHeader = ({ name }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onClickLogout = () => {
        dispatch(logout());
        navigate("/login");
    };
    return (
        <div className="ProfileHeaderBox">
            <div>
                <h2>{name}</h2>
            </div>
            <div>
                <Button outline>
                    <GoDiffAdded size={30}></GoDiffAdded>
                </Button>
                <Button outline onClick={onClickLogout}>
                    <BiLogOut size={30}></BiLogOut>
                </Button>
            </div>
        </div>
    );
};

export default ProfileHeader;
