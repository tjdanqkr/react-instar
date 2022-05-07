import { useContext } from "react";
import { Container } from "reactstrap";
import { UserContext } from "../../store/UserContext";
import ProfileBody from "./ProfileBody";
import ProfileHeader from "./ProfileHeader";
import "./Profile.css";
const Profile = () => {
    const { users } = useContext(UserContext);
    const id = Number(localStorage.getItem("id"));
    const getUser = () => {
        return users.find((user) => id === user.id);
    };
    const { name, img } = getUser();

    return (
        <>
            <ProfileHeader name={name}></ProfileHeader>
            <Container className="ProfileContainer">
                <ProfileBody img={img}></ProfileBody>
            </Container>
        </>
    );
};

export default Profile;
