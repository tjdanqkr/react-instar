import { useContext, useEffect } from "react";
import { Container } from "reactstrap";
import { UserContext } from "../../store/UserContext";
import ProfileBody from "./ProfileBody";
import ProfileHeader from "./ProfileHeader";
import "./Profile.css";
import { PostContext } from "../../store/PostContext";
import { FollowContext } from "../../store/FollowContext";
import Posts from "../Posts/Posts";
import { useDispatch, useSelector } from "react-redux";
import { selectMyPost } from "../../store/posts";
import { selectMyFollower, selectMyFollowing } from "../../store/follows";
const Profile = () => {
    const { name, img, id } = useSelector((state) => state.users.me);
    const myPosts = useSelector((state) => state.posts.myPosts);
    const follower = useSelector((state) => state.follows.myFollower);
    const following = useSelector((state) => state.follows.myFollowing);
    const dispatch = useDispatch();
    const getMyPost = () => {
        dispatch(selectMyPost());
    };
    const myFollower = () => {
        dispatch(selectMyFollower());
        // return follows.filter((follow) => follow.following === id);
    };
    const myFollowing = () => {
        dispatch(selectMyFollowing());
        // return follows.filter((follow) => follow.follower === id);
    };
    useEffect(() => {
        getMyPost();
        myFollower();
        myFollowing();
    }, []);

    return (
        <>
            <ProfileHeader name={name}></ProfileHeader>
            <Container className="ProfileContainer">
                <ProfileBody
                    img={img} //
                    follower={follower}
                    following={following}
                    posts={myPosts}
                    name={name}
                ></ProfileBody>
                <Posts posts={myPosts.posts} name={name} img={img} postState={myPosts}></Posts>
            </Container>
        </>
    );
};
export default Profile;
