import { FaMagnifyingGlass } from "react-icons/fa6";
import './index.css';

function SearchBar() {

    return (
        <div className="row">
            <div className="col-3 d-none d-lg-block" />
            <div className="col d-flex justify-content-between align-items-center">
                <input type="text" className="form-control d-inline w-95" placeholder="Search for recipes..." />
                <FaMagnifyingGlass className="mxr-med-gold icon-size-lg search-icon" />
            </div>
            <div className="col-3 d-none d-lg-block" />
        </div>
    );
}

export default SearchBar;