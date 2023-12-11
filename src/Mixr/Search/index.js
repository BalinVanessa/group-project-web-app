import { useParams } from "react-router";
import SearchBar from "./SearchBar";
import './index.css';
import ResponsiveCenterDiv from "../Util/ResponsiveCenterDiv";
import FilterForm from "./FilterForm";
import IngredientFilterTag from "./IngredientFilterTag";
import { useEffect, useState } from "react";
import * as filterClient from './../Clients/filtersClient'

function Search() {

    const { searchContent } = useParams();
    const [currentFilters, setCurrentFilters] = useState({
        alcoholic: true,
        ingredients: ["vodka", "lime"]
    });

    const fetchCurrentFilters = async () => {
        console.log("fetching current filters");
        // const filters = await filterClient.getCurrentFilters();
        // setCurrentFilters(filters);  
    };

    useEffect(() => {
        fetchCurrentFilters();
    }, []);

    return (
        <>
            <div style={{ paddingTop: "50px" }} />
            <SearchBar existingSearchContent={searchContent} />
            <ResponsiveCenterDiv className="filters-div align-content-top">
                <div className="dropdown margin-left-15" style={{ marginTop: "15px", marginRight: "15px" }}>
                    <button className="golden-button-small dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Filter
                    </button>
                    <FilterForm updateFilters={fetchCurrentFilters} startingFilters={currentFilters} />
                </div>
                <div className="d-flex flex-row flex-wrap">
                    {currentFilters.ingredients.map((i) => {
                        <IngredientFilterTag ingredient={i} isInForm={false}/>
                    })}
                    <IngredientFilterTag ingredient={"Vodka"}/>
                </div>
            </ResponsiveCenterDiv>
        </>
    );

}

export default Search;