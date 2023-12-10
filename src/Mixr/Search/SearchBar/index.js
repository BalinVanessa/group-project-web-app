import { FaMagnifyingGlass } from "react-icons/fa6";
import './index.css';
import { useState } from "react";
import { Link } from "react-router-dom";
import ResponsiveCenterDiv from "../../Util/ResponsiveCenterDiv";

function SearchBar({ existingSearchContent = "" }) {

    const [searchContent, setSearchContent] = useState(existingSearchContent);

    return (
        <ResponsiveCenterDiv>
            <input type="text" className="form-control d-inline w-95 margin-left-15" placeholder="Search for recipes..."
                onChange={(event) => setSearchContent(event.target.value)} value={searchContent} />
            <Link to={`/Search/${searchContent}`}>
                <FaMagnifyingGlass className="mxr-med-gold icon-size-lg search-icon" />
            </Link>
        </ResponsiveCenterDiv>
    );
}

export default SearchBar;