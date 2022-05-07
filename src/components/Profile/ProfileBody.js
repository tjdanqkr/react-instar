import { Button } from "reactstrap";
import "./ProfileBody.css";
const ProfileBody = ({ posts = new Array(5), follower = new Array(5), following = new Array(5), img }) => {
    return (
        <>
            <div>
                <div>
                    <img src={img} alt="myProfileImg"></img>
                </div>
                <div>
                    <div>
                        <p>{posts.length}</p>
                        <p>게시물</p>
                    </div>
                    <div>
                        <p>{follower.length}</p>
                        <p>팔로워</p>
                    </div>
                    <div>
                        <p>{following.length}</p>
                        <p>팔로잉</p>
                    </div>
                </div>
            </div>
            <div>
                <Button>프로필 편집</Button>
                <Button>보관함 보기</Button>
            </div>
        </>
    );
};
export default ProfileBody;
