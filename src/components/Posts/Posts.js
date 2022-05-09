import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Button, Container, Modal, Spinner } from "reactstrap";
import { deletePost, selectMyPost, selectOtherPost } from "../../store/posts";
import { UserContext } from "../../store/UserContext";
import "./Posts.css";
const Posts = ({ postState, posts }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [clickPost, setClickPost] = useState();
    const dispatch = useDispatch();
    const location = useLocation();
    const openModal = (post) => {
        setClickPost(post);
        setIsOpen(true);
    };
    const closeModal = () => {
        setClickPost();
        setIsOpen(false);
    };
    const onClickDelete = (postId) => {
        dispatch(deletePost(postId));
        dispatch(location.pathname === "/profile" ? selectMyPost() : selectOtherPost());

        setIsOpen(false);
    };

    return (
        <div className="Posts">
            {postState.loading ? (
                <Spinner>Loading...</Spinner>
            ) : (
                posts?.map((post) => (
                    <div
                        className="PostsImgBox" //
                        onClick={() => openModal(post)}
                        key={post.id}
                    >
                        <img
                            className="PostsImg" //
                            key={post.id}
                            src={post.img}
                            alt={post.content}
                        ></img>
                    </div>
                ))
            )}
            {clickPost ? (
                <PostDetail
                    isOpen={isOpen} //
                    clickPost={clickPost}
                    closeModal={closeModal}
                    onClickDelete={onClickDelete}
                ></PostDetail>
            ) : null}
        </div>
    );
};
export default Posts;

const PostDetail = ({ isOpen, clickPost, closeModal, onClickDelete }) => {
    const { users } = useContext(UserContext);
    const getUser = () => {
        return users.find((user) => user.id === clickPost.userId);
    };
    const user = getUser();
    const myId = Number(localStorage.getItem("id"));
    return (
        <Modal isOpen={isOpen} fullscreen toggle={closeModal}>
            <div className="PostsModalHeader">
                <Button close onClick={closeModal}></Button>{" "}
                <div>
                    {user.name}
                    <strong>게시물</strong>
                </div>
                {user.id === myId ? (
                    <Button
                        color="danger" //
                        outline
                        onClick={() => onClickDelete(clickPost.id)}
                    >
                        삭제하기
                    </Button>
                ) : (
                    <div></div>
                )}
            </div>
            <Container>
                <div className="PostsBody">
                    <div className="PostsBodyHeader">
                        <div className="PostsBodyHeaderImgBox">
                            <img
                                className="PostsBodyHeaderImg" //
                                src={user.img}
                                alt="userImg"
                            ></img>
                        </div>
                        {user.name}
                    </div>
                    <img
                        className="PostsBodyImg"
                        src={clickPost?.img} //
                        alt="postimg"
                    ></img>
                    <p>{clickPost?.content}</p>
                </div>
            </Container>
        </Modal>
    );
};
