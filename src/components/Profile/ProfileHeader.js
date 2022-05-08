import { AiOutlineMenu } from "react-icons/ai";
import { GoDiffAdded } from "react-icons/go";
import "./ProfileHeader.css";
const ProfileHeader = ({ name }) => {
    return (
        <div className="ProfileHeaderBox">
            <div>
                <h2>{name}</h2>
            </div>
            <div>
                <GoDiffAdded size={30}></GoDiffAdded>

                <AiOutlineMenu size={30}></AiOutlineMenu>
            </div>
        </div>
    );
};

export default ProfileHeader;
