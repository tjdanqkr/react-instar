import { useState } from "react";
import { Button, Container, Modal } from "reactstrap";
import "./ProfileBoard.css";
const ProfileBoard = ({ posts, name, img, deletePost }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [clickPost, setClickPost] = useState();
    const openModal = (post) => {
        setClickPost(post);
        setIsOpen(true);
    };
    const closeModal = () => {
        setClickPost();
        setIsOpen(false);
    };
    const onClickDelete = (postId) => {
        deletePost(postId);
        closeModal();
    };
    return (
        <div className="profileBoard">
            {posts?.map((post) => (
                <div className="profileBoardImgBox" onClick={() => openModal(post)} key={post.id}>
                    <img className="profileBoardImg" key={post.id} src={post.img} alt={post.content}></img>
                </div>
            ))}
            <ProfileBoardDetail
                name={name}
                img={img}
                isOpen={isOpen} //
                clickPost={clickPost}
                closeModal={closeModal}
                onClickDelete={onClickDelete}
            ></ProfileBoardDetail>
        </div>
    );
};
export default ProfileBoard;

const ProfileBoardDetail = ({ name, img, isOpen, clickPost, closeModal, onClickDelete }) => {
    return (
        <Modal isOpen={isOpen} fullscreen toggle={closeModal}>
            <div className="profileBoardModalHeader">
                <div>
                    <Button close onClick={closeModal}></Button>{" "}
                </div>
                <div>
                    {name}
                    <strong>게시물</strong>
                </div>
                <div>
                    <Button color="danger" outline onClick={() => onClickDelete(clickPost.id)}>
                        삭제하기
                    </Button>
                </div>
            </div>
            <Container>
                <div className="profileBoardBody">
                    <div className="profileBoardBodyHeader">
                        <div className="profileBoardBodyHeaderImgBox">
                            <img className="profileBoardBodyHeaderImg" src={img} alt="userImg"></img>
                        </div>
                        {name}
                    </div>
                    <img className="profileBoardBodyImg" src={clickPost?.img} alt="postimg"></img>
                    <p>{clickPost?.content}</p>
                </div>
            </Container>
        </Modal>
    );
};
