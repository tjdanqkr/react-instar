import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { GoDiffAdded } from "react-icons/go";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Container, Input, Modal } from "reactstrap";
import { insertPosts, selectMyPost } from "../../store/posts";
import { logout } from "../../store/users";
import "./ProfileHeader.css";
const ProfileHeader = ({ name }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onClickLogout = () => {
        dispatch(logout());
        navigate("/login");
    };
    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => {
        setIsOpen(false);
    };
    const openModal = () => {
        setIsOpen(true);
    };
    return (
        <div className="ProfileHeaderBox">
            <div>
                <h2>{name}</h2>
            </div>
            <div>
                <Button outline onClick={openModal}>
                    <GoDiffAdded size={30}></GoDiffAdded>
                </Button>
                <Button outline onClick={onClickLogout}>
                    <BiLogOut size={30}></BiLogOut>
                </Button>
            </div>
            <ProfileHeaderAddModal isOpen={isOpen} closeModal={closeModal}></ProfileHeaderAddModal>
        </div>
    );
};

export default ProfileHeader;

const ProfileHeaderAddModal = ({ isOpen, closeModal }) => {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        content: "",
        img: "/img/post/1.jpeg",
    });
    const onChangeFile = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise((resolve) => {
            reader.onload = () => {
                setForm({ ...form, img: reader.result });
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
        await dispatch(selectMyPost());
        closeModal();
    };
    return (
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
                            <img className="profileImg" src={form.img} alt="myProfileImg"></img>
                        </div>
                    </label>

                    <Input type="textarea" value={form.name} onChange={(e) => onChangeName(e)}></Input>
                </div>
            </Container>
        </Modal>
    );
};
