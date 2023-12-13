import { useParams } from "react-router";
import SearchBar from "./SearchBar";
import './index.css';
import ResponsiveCenterDiv from "../Util/ResponsiveCenterDiv";
import FilterForm from "./FilterForm";
import IngredientFilterTag from "./IngredientFilterTag";
import { useEffect, useState } from "react";
import * as filterClient from './../Clients/filtersClient'
import * as externalDrinksClient from './../Clients/externalDrinksClient';
import * as ourDrinksClient from './../Clients/ourDrinksClient';
import DrinkCard from "./DrinkCard";

function Search() {

    const { searchContent } = useParams();
    const [isSearching, setIsSearching] = useState(false);
    const [currentFilters, setCurrentFilters] = useState({
        alcoholic: null,
        ingredients: []
    });
    const [searchResults, setSearchResults] = useState([]);

    const fetchCurrentFilters = async () => {
        const filters = await filterClient.getCurrentFilters();
        setCurrentFilters(filters !== undefined ? filters : currentFilters);
    };

    const setSessionFilters = async (filters) => {
        try {
            await filterClient.setFilters(filters);
        } catch (error) {
            console.error(`Error setting session filters: ${error}`)
        }
    }

    const handleDeleteIngredientFilter = (ingredient) => {
        const newFilters = {
            ...currentFilters,
            ingredients: currentFilters.ingredients.filter((i) => i !== ingredient)
        };

        setCurrentFilters(newFilters);
        setSessionFilters(newFilters);
    }

    const handleDeleteAlcoholicFilter = (filter) => {
        const newFilters = {
            ...currentFilters,
            alcoholic: null
        }

        setCurrentFilters(newFilters);
        setSessionFilters(newFilters);
    }

    const searchForCocktails = async () => {
        setIsSearching(true);
        const externalResponse = await externalDrinksClient.findExternalDrinksByName(searchContent);
        const mixrResponse = await ourDrinksClient.findDrinkByName(searchContent);
        const combinedResponse = [...(mixrResponse || []), ...(externalResponse || [])];
        setIsSearching(false);
        setSearchResults(combinedResponse);
    }

    useEffect(() => {
        searchForCocktails();
        fetchCurrentFilters();
    }, [searchContent]);

    return (
        <div style={{ marginLeft: "15px" }}>
            <div style={{ paddingTop: "50px" }} />
            <SearchBar existingSearchContent={searchContent} />
            <ResponsiveCenterDiv className="filters-div align-content-top">
                <div className="dropdown" style={{ marginTop: "15px", marginRight: "15px", marginBottom: "auto" }}>
                    <button className="golden-button-small dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Filter
                    </button>
                    <FilterForm updateFilters={fetchCurrentFilters} startingFilters={currentFilters} />
                </div>
                <div className="d-flex flex-row flex-wrap align-content-center">
                    {currentFilters.alcoholic !== null && <IngredientFilterTag ingredient={currentFilters.alcoholic} isInForm={false} deleteIngredient={handleDeleteAlcoholicFilter} />}
                    {currentFilters && currentFilters.ingredients.map((i) => (
                        <IngredientFilterTag ingredient={i} isInForm={false} deleteIngredient={handleDeleteIngredientFilter} />
                    ))}
                </div>
            </ResponsiveCenterDiv>
            <ResponsiveCenterDiv>
                <div className="search-results-div">
                    {isSearching ?
                        <div className="d-flex justify-content-center w-100">
                            <h1 style={{ color: "white" }}>Searching for Cocktails...</h1>
                        </div>
                        :
                        searchResults && searchResults.length > 0 ?
                            <div className="d-flex flex-column">
                                <h1 className="mxr-med-gold mb-3">{searchResults.length} Results</h1>
                                <div className="d-flex flex-wrap row">
                                    {searchResults && searchResults.map((d) =>
                                        <div className="col-md-6 col-xxl-4">
                                            <DrinkCard drink={d} />
                                        </div>
                                    )}
                                </div>
                            </div>
                            :
                            <div className="d-flex justify-content-center">
                                <h1 style={{ color: "white" }}>
                                    {searchContent?.length > 0 ?
                                        "No results :/" : ""}
                                </h1>
                            </div>}
                </div>
            </ResponsiveCenterDiv>
        </div>
    );

}

export default Search;