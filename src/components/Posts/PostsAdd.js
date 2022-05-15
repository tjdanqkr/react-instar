import { useState } from "react";
import { GoDiffAdded } from "react-icons/go";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Button, Container, Input, Modal } from "reactstrap";
import { insertPosts, selectMyPost, selectOtherPost } from "../../store/posts";

const PostsAdd = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        content: "",
        img: "/img/post/1.jpeg",
        file: "",
    });
    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => {
        setIsOpen(false);
    };
    const openModal = () => {
        setIsOpen(true);
    };
    const onChangeFile = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise((resolve) => {
            reader.onload = () => {
                setForm({ ...form, img: reader.result, file });
                resolve();
            };
        });
    };
    const onChangeName = (e) => {
        const { value } = e.target;
        setForm({ ...form, content: value });
    };
    const onSubmit = async () => {
        await dispatch(insertPosts(form));
        await dispatch(location.pathname === "/profile" ? selectMyPost() : selectOtherPost());
        closeModal();
    };

    return (
        <>
            <Button outline onClick={openModal}>
                <GoDiffAdded size={30}></GoDiffAdded>
            </Button>

            <Modal isOpen={isOpen} fullscreen toggle={closeModal}>
                <div className="PostsModalHeader">
                    <Button close onClick={closeModal}></Button>{" "}
                    <div>
                        <strong>게시물 생성</strong>
                    </div>
                    <Button
                        color="info" //
                        outline
                        onClick={onSubmit}
                    >
                        글쓰기
                    </Button>
                </div>
                <Container>
                    <div className="profileUpdateForm">
                        <Input
                            type="file"
                            hidden //
                            accept="image/*"
                            id="imgUpload"
                            onChange={(e) => onChangeFile(e)}
                        ></Input>
                        <label htmlFor="imgUpload">
                            <div className="profileImgBox">
                                <img
                                    className="profileImg" //
                                    src={
                                        form.img?.indexOf("/") //
                                            ? form.img
                                            : `http://localhost:8000${form.img}`
                                    }
                                    alt="myProfileImg"
                                ></img>
                            </div>
                        </label>

                        <Input type="textarea" value={form.name} onChange={(e) => onChangeName(e)}></Input>
                    </div>
                </Container>
            </Modal>
        </>
    );
};

export default PostsAdd;
