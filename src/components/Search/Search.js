import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectOtherPost, selectPostsByKey } from "../../store/posts";
import { selectUserByKey } from "../../store/users";
import Posts from "../Posts/Posts";
import SearchBar from "./SearchBar";

const Search = () => {
    const dispatch = useDispatch();
    const otherPosts = useSelector((state) => state.posts.otherPosts);
    useEffect(() => {
        dispatch(selectOtherPost());
    }, []);
    const [searchKey, setSearchKey] = useState();
    const onSubmitSearch = async (e) => {
        e.preventDefault();
        const findUserId = await dispatch(selectUserByKey(searchKey)).unwrap();
        await dispatch(selectPostsByKey({ searchKey, userId: findUserId }));
    };

    return (
        <div>
            <SearchBar
                searchKey={searchKey}
                setSearchKey={setSearchKey} //
                onSubmitSearch={onSubmitSearch}
            ></SearchBar>
            <Posts posts={otherPosts.posts} postState={otherPosts}></Posts>
        </div>
    );
};

export default Search;
