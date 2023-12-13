import { useParams } from "react-router";
import SearchBar from "./SearchBar";
import '../index.css';
import ResponsiveCenterDiv from "../Util/ResponsiveCenterDiv";
import FilterForm from "./FilterForm";
import IngredientFilterTag from "./IngredientFilterTag";
import { useEffect, useState } from "react";
import * as filterClient from './../Clients/filtersClient'

function Search() {

    const { searchContent } = useParams();
    const [currentFilters, setCurrentFilters] = useState({
        alcoholic: null,
        ingredients: []
    });

    const fetchCurrentFilters = async () => {
        const filters = await filterClient.getCurrentFilters();
        setCurrentFilters(filters !== undefined ? filters : currentFilters);
    };

    const setSessionFilters = async(filters) => {
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

    useEffect(() => {
        fetchCurrentFilters();
    }, []);

    return (
        <>
            <div style={{ paddingTop: "50px" }} />
            <SearchBar existingSearchContent={searchContent} />
            <ResponsiveCenterDiv className="filters-div align-content-top">
                <div className="dropdown margin-left-15" style={{ marginTop: "15px", marginRight: "15px", marginBottom:"auto" }}>
                    <button className="golden-button-small dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Filter
                    </button>
                    <FilterForm updateFilters={fetchCurrentFilters} startingFilters={currentFilters} />
                </div>
                <div className="d-flex flex-row flex-wrap align-content-center">
                    {currentFilters.alcoholic !== null && <IngredientFilterTag ingredient={currentFilters.alcoholic} isInForm={false} deleteIngredient={handleDeleteAlcoholicFilter} />}
                    {currentFilters && currentFilters.ingredients.map((i) => (
                        <IngredientFilterTag ingredient={i} isInForm={false} deleteIngredient={handleDeleteIngredientFilter}/>
                    ))}
                </div>
            </ResponsiveCenterDiv>
        </>
    );

}

export default Search;