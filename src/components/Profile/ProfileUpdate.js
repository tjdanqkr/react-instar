import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Input, InputGroup, InputGroupText, Modal } from "reactstrap";
import { UserContext } from "../../store/UserContext";
import { updateUsers } from "../../store/users";
import "./ProfileUpdate.css";
const ProfileUpdate = ({ img = "/img/profile/1.jpeg", name = "park", isOpen, modalClose }) => {
    const [form, setForm] = useState({
        name,
        img,
    });
    const dispatch = useDispatch();
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
        setForm({ ...form, name: value });
    };
    // const { updateUsers } = useContext(UserContext);

    const onSubmit = () => {
        dispatch(updateUsers(form));
        modalClose();
    };
    return (
        <Modal fullscreen isOpen={isOpen}>
            <ProfileUpdateHeader modalClose={modalClose} onSubmit={onSubmit}></ProfileUpdateHeader>
            <ProfileUpdateBody onChangeName={onChangeName} onChangeFile={onChangeFile} form={form}></ProfileUpdateBody>
        </Modal>
    );
};

export default ProfileUpdate;

const ProfileUpdateHeader = ({ modalClose, onSubmit }) => {
    return (
        <div className="profileUpdateHeader">
            <Button outline color="secondary" onClick={modalClose}>
                취소
            </Button>
            <b>프로필 수정</b>
            <Button outline color="primary" onClick={onSubmit}>
                수정
            </Button>
        </div>
    );
};

const ProfileUpdateBody = ({ onChangeFile, onChangeName, form }) => {
    return (
        <div className="profileUpdateForm">
            <Input type="file" hidden accept="image/*" id="imgUpload" onChange={(e) => onChangeFile(e)}></Input>
            <label htmlFor="imgUpload">
                <div className="profileImgBox">
                    <img className="profileImg" src={form.img} alt="myProfileImg"></img>
                </div>
            </label>

            <InputGroup>
                <InputGroupText>이름</InputGroupText>
                <Input type="text" value={form.name} onChange={(e) => onChangeName(e)}></Input>
            </InputGroup>
        </div>
    );
};
