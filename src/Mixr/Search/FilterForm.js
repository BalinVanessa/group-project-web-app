import { useEffect, useState } from "react";
import * as filtersClient from './../Clients/filtersClient.js'
import IngredientFilterTag from "./IngredientFilterTag.js";

function FilterForm({ updateFilters, startingFilters }) {
    /*
        filters: {
            "alcoholic": true,
            ingredients: [
                "vodka", "lime", etc...
            ]
        }
    */
    const [currentFilters, setCurrentFilters] = useState(null);
    const [currentIngredient, setCurrentIngredient] = useState();

    const handleDeleteIngredientFilter = (ingredient) => {
        const newFilters = {
            ...currentFilters,
            ingredients: currentFilters.ingredients.filter((i) => i !== ingredient)
        };

        setCurrentFilters(newFilters);
    }

    const handleAddIngredientFilter = (event) => {
        if (currentIngredient === '') {
            console.log("No ingredient inputted");
            return;
        }

        if (!ingredientExists(currentIngredient)) {
            console.log("Ingredient does not exist"); // or add ingredient to mongoDB (?)
            return;
        }

        // update local state of currentFilters
        const newFilters = {
            ...currentFilters.alcoholic,
            ingredients: [
                ...currentFilters.ingredients,
                currentIngredient
            ]
        };

        setCurrentFilters(newFilters);

        setCurrentIngredient('');
    };

    const ingredientExists = (ingredient) => {
        console.log(`checking if ${ingredient} exists`);
        // check if ingredient exists
        return true;
    };

    const handleUpdateFilters = (event) => {
        // set filters in session to local state filters using client
        updateFilters();
    }

    useEffect(() => {
        setCurrentFilters(startingFilters);
    }, []);

    return (
        <form className="dropdown-menu p-4" style={{ width: "300px" }}>
            <div onClick={(event) => event.stopPropagation()}>
                <div className="mb-3">
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="alcoholic-check" />
                        <label className="form-check-label" htmlFor="alcoholic-check">
                            Alcoholic
                        </label>
                    </div>
                </div>
                <div className="mb-3">
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="non-alcoholic-check" />
                        <label className="form-check-label" htmlFor="non-alcoholic-check">
                            Non-Alcoholic
                        </label>
                    </div>
                </div>
                <div className="dropdown-divider"></div>
                <label className="form-check-label" htmlFor="ingredient-search-input"><h5>Ingredients</h5></label>
                <div className="mb-3">
                    <input type="text" className="form-control w-75 ingred-search" placeholder="Search for ingredients..." id="ingredient-search-input"
                        onChange={(e) => setCurrentIngredient(e.target.value)} value={currentIngredient}/>
                    <button className="golden-button-small add-ingred-button margin-left-15" onClick={handleAddIngredientFilter}>+</button>
                </div>
                <div className="filter-tags-div">
                    {currentFilters && currentFilters.ingredients.map((i) => (
                        <IngredientFilterTag ingredient={i} deleteIngredient={handleDeleteIngredientFilter} isInForm={true}/>
                    ))}
                </div>
            </div>
            <button className="btn btn-primary" onClick={handleUpdateFilters}>Apply</button>
        </form>
    );
}

export default FilterForm;