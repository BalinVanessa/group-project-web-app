import { useParams } from "react-router";
import SearchBar from "./SearchBar";
import './index.css';
import ResponsiveCenterDiv from "../Util/ResponsiveCenterDiv";
import FilterForm from "./FilterForm";

function Search() {

    const { searchContent } = useParams();

    return (
        <>
            <div style={{paddingTop: "50px"}}/>
            <SearchBar existingSearchContent={searchContent} />
            <ResponsiveCenterDiv>
                <div className="dropdown margin-left-15" style={{ marginTop: "15px" }}>
                    <button className="golden-button-small dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Filter
                    </button>
                    <FilterForm />
                </div>
            </ResponsiveCenterDiv>
        </>
    );

}

export default Search;