import { AiOutlineSearch } from "react-icons/ai";
import { Form, Input, Button } from "reactstrap";
import "./SearchBar.css";
const SearchBar = ({ searchKey, setSearchKey, onSubmitSearch }) => {
    return (
        <Form className="searchBar" onSubmit={onSubmitSearch}>
            <Input type="text" onChange={(e) => setSearchKey(e.target.value)} value={searchKey} placeholder="검색"></Input>
            <Button type="submit" outline>
                <AiOutlineSearch></AiOutlineSearch>
            </Button>
        </Form>
    );
};

export default SearchBar;
