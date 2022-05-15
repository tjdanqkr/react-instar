import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Container, Spinner } from "reactstrap";
import { selectMyFollower } from "../../store/follows";
import { selectPostMain } from "../../store/posts";
import PostsAdd from "../Posts/PostsAdd";
import "./Main.css";

const Main = () => {
    const mainPosts = useSelector((state) => state.posts.mainPosts);
    const dispatch = useDispatch();
    const followOtherPost = async () => {
        await dispatch(selectMyFollower());
        await dispatch(selectPostMain());
    };
    useEffect(() => {
        followOtherPost();
    }, []);
    return (
        <div>
            <MainHeader></MainHeader>
            <Container>
                {mainPosts.loading ? ( //
                    <Spinner>loading...</Spinner>
                ) : (
                    mainPosts.posts.map((post) => <MainCard key={post.id} post={post}></MainCard>)
                )}
            </Container>
        </div>
    );
};

export default Main;

const MainHeader = () => {
    return (
        <div className="mainHeader">
            <div className="mainImgBox">
                <img className="mainLogo" src="https://www.instagram.com/static/images/web/logged_out_wordmark-2x.png/d2529dbef8ed.png" alt="Logo"></img>
            </div>
            <PostsAdd></PostsAdd>
        </div>
    );
};

const MainCard = ({ post }) => {
    return (
        <Card className="mainCard">
            <div className="PostsBodyHeader">
                <div className="PostsBodyHeaderImgBox">
                    <img
                        className="PostsBodyHeaderImg" //
                        src={`http://localhost:8000${post?.userImg}`}
                        alt="userImg"
                    ></img>
                </div>
                {post.userName}
            </div>
            <img
                className="PostsBodyImg"
                src={`http://localhost:8000${post?.img}`} //
                alt="postimg"
            ></img>
            <p>{post?.content}</p>
        </Card>
    );
};
