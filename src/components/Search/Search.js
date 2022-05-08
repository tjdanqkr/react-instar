import { useContext, useState } from "react";
import { FollowContext } from "../../store/FollowContext";
import { PostContext } from "../../store/PostContext";
import { UserContext } from "../../store/UserContext";
import Posts from "../Posts/Posts";
import SearchBar from "./SearchBar";

const Search = () => {
    const { users } = useContext(UserContext);
    const id = Number(localStorage.getItem("id"));
    const { posts, deletePost } = useContext(PostContext);
    const otherPosts = () => {
        return posts.filter((post) => post.userId !== id);
    };
    const [searchPost, setSearchPost] = useState(otherPosts);

    const [searchKey, setSearchKey] = useState();
    const onSubmitSearch = (e) => {
        e.preventDefault();
        const reg = new RegExp(searchKey, "g");
        const findUser = users.find((user) => reg.test(user.name));
        const findPosts = posts.filter(
            (
                post //
            ) => findUser.id === post.userId || reg.test(post.content)
        );
        setSearchPost(findPosts);
    };

    return (
        <div>
            <SearchBar
                searchKey={searchKey}
                setSearchKey={setSearchKey} //
                onSubmitSearch={onSubmitSearch}
            ></SearchBar>
            <Posts posts={searchPost} deletePost={deletePost}></Posts>
        </div>
    );
};

export default Search;
