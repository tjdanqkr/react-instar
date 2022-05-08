import { useState } from "react";
import { Button, Container, Modal, ModalBody, ModalHeader } from "reactstrap";
import "./ProfileBoard.css";
const ProfileBoard = ({ posts, name, img }) => {
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
    return (
        <div className="profileBoard">
            {posts?.map((post) => (
                <div className="profileBoardImgBox" onClick={() => openModal(post)}>
                    <img className="profileBoardImg" key={post.id} src={post.img} alt={post.content}></img>
                </div>
            ))}
            <ProfileBoardDetail name={name} img={img} isOpen={isOpen} clickPost={clickPost} closeModal={closeModal}></ProfileBoardDetail>
        </div>
    );
};
export default ProfileBoard;

const ProfileBoardDetail = ({ name, img, isOpen, clickPost, closeModal }) => {
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
                    <Button color="danger" outline>
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
                    <img className="profileBoardBodyImg" src={clickPost.img} alt="postimg"></img>
                    <p>{clickPost.content}</p>
                </div>
            </Container>
        </Modal>
    );
};
