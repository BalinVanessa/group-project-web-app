import { useEffect, useState } from "react";
import * as filterClient from './../Clients/filtersClient.js'
import * as ingredientClient from './../Clients/ingredientsClient.js'
import IngredientFilterTag from "./IngredientFilterTag.js";

function FilterForm({ updateFilters, startingFilters }) {
    /**
     *      {
     *          alcoholic: "Alcoholic",
     *          ingredients: [
     *              "ingredient1", "ingredient2", etc...
     *          ]
     *      }
     */
    const [currentFilters, setCurrentFilters] = useState(null); // for tracking filters (alcoholic ("Alcoholic", "Non alcoholic", or null), ingredients[])
    const [currentIngredient, setCurrentIngredient] = useState(''); // for tracking value of ingredient text input
    const [alcoholicSelection, setAlcoholicSelection] = useState(null); // for tracking state of alcoholic radios
    const [ingredientAutofill, setIngredientAutofill] = useState([]); // for tracking autofill values
    const [invalidIngredient, setInvalidIngredient] = useState(false); // for tracking if an invalid ingredient was inputted

    // updates state of alcoholic radios (if same radio is clicked, sets to null (neither selected), otherwise sets to the one that was selected)
    const handleAlcoholicChange = (selection) => {
        const newSelection = alcoholicSelection === selection ? null : selection;
        setAlcoholicSelection(newSelection);

        const newFilters = {
            ...currentFilters,
            alcoholic: newSelection
        }

        setCurrentFilters(newFilters);
    }

    // removes ingredient from local useState
    const handleDeleteIngredientFilter = (ingredient) => {
        const newFilters = {
            ...currentFilters,
            ingredients: currentFilters.ingredients.filter((i) => i !== ingredient)
        };

        setCurrentFilters(newFilters);
    }

    // 
    const handleAddIngredientFilter = async (event) => {
        if (currentIngredient === '') {
            console.log("No ingredient inputted");
            return;
        }

        // checks if valid ingredient
        if (!(await ingredientExists(currentIngredient)) || ingredientFilterExists(currentIngredient)) {
            setInvalidIngredient(true);
            setCurrentIngredient('');
            return;
        }

        // creates new filters object with new ingredient added 
        const newFilters = {
            ...currentFilters,
            ingredients: [
                ...currentFilters.ingredients,
                currentIngredient
            ]
        };

        // update local state of currentFilters
        setCurrentFilters(newFilters);

        // set input to empty
        setCurrentIngredient('');
    };

    const ingredientFilterExists = (ingredient) => {
        console.log(`current ingredient: ${ingredient}`)
        console.log(`existing ingredients: ${currentFilters.ingredients}`)
        const ingredientExists = currentFilters.ingredients.some((i) => {
            console.log(i);
            return (i === ingredient)
        });

        return ingredientExists;
    }

    const ingredientExists = async (ingredient) => {
        // query mongoDB
        console.log(`checking if ${ingredient} exists`)
        const mixrIngredient = await ingredientClient.findMixrIngredientByName(ingredient);
        // query external API
        const externalIngredient = await ingredientClient.findExternalIngredientByName(ingredient);

        return mixrIngredient || externalIngredient;
    };

    // called when "Apply" button is clicked
    const handleUpdateFilters = async (event) => {
        // updates filters in session
        await filterClient.setFilters(currentFilters);
        // calls function passed in from parent
        //  - function in parent element fetches updated filters from session and updates parent useState
        updateFilters();
    }

    // calls client to autofill based on text input
    const handleIngredientAutofill = async (partialName) => {
        // queries mongoDB for matching ingredients
        const mixrAutofillResponse = await ingredientClient.findTop5MixrIngredients(partialName);

        // if there aren't at least 5 matching ingredients, queries external API
        if (!mixrAutofillResponse || mixrAutofillResponse.length < 5) {
            try {
                const externalAutofillResponse = await ingredientClient.findTop5ExternalIngredients(partialName);
                const slicedExternalResponse = externalAutofillResponse.slice(0, 5 - mixrAutofillResponse.length);
                // combines responses of both APIs into one response
                const combinedAutofillResponse = [...mixrAutofillResponse, ...slicedExternalResponse];
                setIngredientAutofill(combinedAutofillResponse);
                return;
            } catch (error) {
                console.error(error);
                return;
            }
        }

        setIngredientAutofill(mixrAutofillResponse);
    }

    useEffect(() => {
        // updates the currentFilters useState to match filters object passed in by parent
        setCurrentFilters(startingFilters);
        // updates the alcoholic radio selection to match filters object passed in by parent
        setAlcoholicSelection(startingFilters.alcoholic);
    }, [startingFilters]);

    return (
        <form className="dropdown-menu p-4" style={{ width: "300px" }}>
            <div onClick={(event) => event.stopPropagation()}>
                <div className="mb-3">
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="alcoholic-check"
                            checked={alcoholicSelection === 'Alcoholic'} // checked when radio selection matches
                            onClick={() => handleAlcoholicChange('Alcoholic')} // includes onClick handler so user can deselect radio
                        />
                        <label className="form-check-label" htmlFor="alcoholic-check">
                            Alcoholic
                        </label>
                    </div>
                </div>
                <div className="mb-3">
                    <div className="form-check"><input
                        type="radio"
                        className="form-check-input"
                        id="non-alcoholic-check"
                        checked={alcoholicSelection === 'Non alcoholic'}
                        onClick={() => handleAlcoholicChange('Non alcoholic')} />
                        <label className="form-check-label" htmlFor="non-alcoholic-check">
                            Non-Alcoholic
                        </label>
                    </div>
                </div>
                <div className="dropdown-divider"></div>
                <label className="form-check-label" htmlFor="ingredient-search-input"><h5>Ingredients</h5></label>
                <div className="mb-3 dropdown">
                    <input
                        type="text"
                        className="form-control w-75 ingred-search dropdown-toggle"
                        placeholder="Search for ingredients..."
                        id="ingredient-search-input"
                        onChange={(e) => {
                            setInvalidIngredient(false);
                            setCurrentIngredient(e.target.value);
                            handleIngredientAutofill(e.target.value);
                        }}
                        value={currentIngredient}
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        autoComplete="off" />
                    <button className="golden-button-small add-ingred-button margin-left-15" onClick={handleAddIngredientFilter}>+</button>
                    {<ul className="dropdown-menu">
                        {ingredientAutofill.map((ingredient) => {
                            return (
                                <li>
                                    <a className="dropdown-item" onClick={(e) => setCurrentIngredient(ingredient)}>{ingredient}</a>
                                </li>)
                        })}
                    </ul>}
                    {invalidIngredient && <div className="alert alert-danger" role="alert" style={{ padding: "5px 15px", marginTop: "15px" }}>
                        Invalid ingredient
                    </div>}
                </div>
                <div className="filter-tags-div">
                    {currentFilters && currentFilters.ingredients.map((i) => (
                        <IngredientFilterTag ingredient={i} deleteIngredient={handleDeleteIngredientFilter} isInForm={true} />
                    ))}
                </div>
            </div>
            <button className="btn btn-primary" onClick={handleUpdateFilters}>Apply</button>
        </form>
    );
}

export default FilterForm;