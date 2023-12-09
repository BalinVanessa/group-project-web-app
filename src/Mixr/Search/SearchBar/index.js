import { FaMagnifyingGlass } from "react-icons/fa6";
import './index.css';
import { useState } from "react";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";

function SearchBar({existingSearchContent = ""}) {

    const [searchContent, setSearchContent] = useState(existingSearchContent);

    return (
        <div className="row">
            <div className="col-3 d-none d-lg-block" />
            <div className="col d-flex justify-content-between align-items-center">
                <input type="text" className="form-control d-inline w-95" placeholder="Search for recipes..."
                    onChange={(event) => setSearchContent(event.target.value)} value={searchContent} />
                <Link to={`/Search/${searchContent}`}>
                    <FaMagnifyingGlass className="mxr-med-gold icon-size-lg search-icon" />
                </Link>
            </div>
            <div className="col-3 d-none d-lg-block" />
        </div>
    );
}

export default SearchBar;