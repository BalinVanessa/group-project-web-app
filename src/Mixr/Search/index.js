import { useParams } from "react-router";
import SearchBar from "./SearchBar";

function Search() {

    const {searchContent} = useParams();

    return (
        <>
            <SearchBar existingSearchContent={searchContent}/>
        </>
    );

}

export default Search;