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
    const [filterRefresh, setFilterRefresh] = useState(null);

    const updateFilters = async () => {
        await fetchCurrentFilters();
        await searchForCocktails();
    }

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
        setFilterRefresh(Date.now());
    }

    const handleDeleteAlcoholicFilter = () => {
        const newFilters = {
            ...currentFilters,
            alcoholic: null
        }

        setCurrentFilters(newFilters);
        setSessionFilters(newFilters);
        setFilterRefresh(Date.now());
    }

    const searchForCocktails = async () => {
        setIsSearching(true);
        const externalResponse = await externalDrinksClient.findExternalDrinksByName(searchContent);
        const mixrResponse = await ourDrinksClient.findDrinkByName(searchContent);
        const combinedResponse = [...(mixrResponse || []), ...(externalResponse || [])];
        setIsSearching(false);
        const filteredResults = applyFilters(combinedResponse);
        setSearchResults(filteredResults);
    }

    const applyFilters = (unfilteredResults) => {
        if (!unfilteredResults) return unfilteredResults;

        const results = unfilteredResults.filter((drink) => {
            return drink && passesFilter(drink)
        });

        return results;
    }

    const passesFilter = (drink) => {
        if (drink) {
            if (!(drink.strAlcoholic === currentFilters.alcoholic || currentFilters.alcoholic === null)) {
                return false;
            }

            if (!(currentFilters.ingredients && currentFilters.ingredients.length > 0)) {
                return true;
            }

            if (drink.ingredients) {
                let containsIngredientCount = 0;
                // is Mixr drink, ingredients is array
                drink.ingredients.forEach((strIngredient) => {
                    const matchesIngredient = currentFilters.ingredients.some((filterIngredient) =>
                        filterIngredient.toLowerCase() === strIngredient.toLowerCase()
                    );
                    if (matchesIngredient) containsIngredientCount++;
                })

                return containsIngredientCount == currentFilters.ingredients.length;
            } else {
                // is external API drink, ingredients stored in strIngredient1, strIngredient2, etc.
                let containsIngredientCount = 0;

                for (let i = 1; i < 15; i++) {
                    const ingredientProperty = `strIngredient${i}`;
                    const strIngredient = drink[`${ingredientProperty}`];

                    if (strIngredient) {
                        const ingredientMatches = currentFilters.ingredients.some((filterIngredient) =>
                            filterIngredient.toLowerCase() === strIngredient.toLowerCase()
                        );

                        if (ingredientMatches) containsIngredientCount++;
                    } else {
                        break;
                    }
                }

                return containsIngredientCount == currentFilters.ingredients.length;
            }
        }

        return false;
    }

    useEffect(() => {
        updateFilters();
    }, [searchContent, filterRefresh]);

    useEffect(() => {
        setSearchResults((prevSearchResults) => applyFilters(prevSearchResults));
    }, [currentFilters, isSearching])

    return (
        <div style={{ marginLeft: "15px" }}>
            <div style={{ paddingTop: "50px" }} />
            <SearchBar existingSearchContent={searchContent} />
            <ResponsiveCenterDiv className="filters-div align-content-top">
                <div className="dropdown" style={{ marginTop: "15px", marginRight: "15px", marginBottom: "auto" }}>
                    <button className="golden-button-small dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Filter
                    </button>
                    <FilterForm updateFilters={updateFilters} startingFilters={currentFilters} />
                </div>
                <div className="d-flex flex-row flex-wrap align-content-center">
                    {currentFilters.alcoholic !== null && <IngredientFilterTag ingredient={currentFilters.alcoholic} isInForm={false} deleteIngredient={handleDeleteAlcoholicFilter} />}
                    {currentFilters && currentFilters.ingredients.map((i) => (
                        <IngredientFilterTag ingredient={i} isInForm={false} deleteIngredient={handleDeleteIngredientFilter} />
                    ))}
                </div>
            </ResponsiveCenterDiv>
            <ResponsiveCenterDiv>
                <div className="search-results-div col-12">
                    {isSearching ?
                        <div className="d-flex justify-content-center w-100">
                            <h1 className="mxr-med-gold">Searching for Cocktails...</h1>
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
                                <h1 className="mxr-med-gold">
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