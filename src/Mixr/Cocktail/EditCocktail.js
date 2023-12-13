import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { FaPlus } from "react-icons/fa6";
import { FaTrashCan } from "react-icons/fa6";

import * as ourDrinksClient from "../Clients/ourDrinksClient";
import * as ingredientClient from "../Clients/ingredientsClient";
import './index.css';


function EditCocktail() {
    const { id } = useParams(); //grabs drinkID
    const [currentDrink, setCurrentDrink] = useState(null);
    const [inputtedIngredient, setInputtedIngredient] = useState('');
    const [ingredientAutofillValues, setIngredientAutofillValues] = useState([]);

    const fetchDrink = async () => {
        const drink = await ourDrinksClient.findDrinkById(id);
        setCurrentDrink(drink);
    };

    const addIngredient = () => {
        // add ingredient to currentDrink
    }

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
                setIngredientAutofillValues(combinedAutofillResponse);
                return;
            } catch (error) {
                console.error(error);
                return;
            }
        }

        setIngredientAutofillValues(mixrAutofillResponse);
    }

    /*
    const saveDrink = async () => {
        for all ingredients in current drink:
            if ingredient already exists:
                get ingredient ID, add to ingredients array (to match mongo schema)
            else
                add ingredient to mongoDB, add ID to ingredients array
        
        await ourDrinksClient.updateDrink(currentDrink);
    };
    */

    useEffect(() => {
        fetchDrink();
        // saveDrink();
    }, [id]);

    return (
        <div>
            <div className="mxr-container mt-5">
                <h1 className="mxr-med-gold">Edit Recipe</h1>
            </div>

            <div className="mxr-container-smaller mt-5">
                <div className="row">
                    <div className="col-3">
                        <h4 className="mxr-med-gold">Cocktail Name:</h4>
                    </div>
                    <div className="col-9">
                        <input type="text" className="form-control w-100" value={currentDrink?.strDrink}
                            onChange={(e) => setCurrentDrink({ ...currentDrink, strDrink: e.target.value })} />
                    </div>
                </div>
                <div className="spacer-s"></div>

                <div className="row">
                    <div className="col-3">
                        <h4 className="mxr-med-gold">Drink Type</h4>
                    </div>
                    <div className="col-9">
                        <input type="radio" id="alcoholic" name="drinkType"
                            onChange={(e) => setCurrentDrink({ ...currentDrink, strAlcoholic: e.target.value })} />
                        <label className="mxr-light-gold ms-2" for="alcoholic">Alcoholic</label>
                        <div className="spacer-xs"></div>
                        <input type="radio" id="non-alcoholic" name="drinkType"
                            onChange={(e) => setCurrentDrink({ ...currentDrink, strAlcoholic: e.target.value })} />
                        <label className="mxr-light-gold ms-2" for="non-alcoholic">Non-Alcoholic</label>
                    </div>
                </div>
                <div className="spacer-s"></div>

                <div className="row">
                    <div className="col-3">
                        <h4 className="mxr-med-gold">Ingredients:</h4>
                    </div>
                    <div className="col-9">
                        <div className="d-flex flex-row">
                            <div className="dropdown w-100">
                                <input
                                    type="text"
                                    className="form-control w-100 ingred-search dropdown-toggle"
                                    placeholder="Search for ingredients..."
                                    id="ingredient-search-input"
                                    onChange={(e) => {
                                        setInputtedIngredient(e.target.value);
                                        handleIngredientAutofill(e.target.value);
                                    }}
                                    value={inputtedIngredient}
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    autoComplete="off" />
                                {<ul className="dropdown-menu w-100">
                                    {ingredientAutofillValues.map((ingredient) => (
                                        <li>
                                            <a className="dropdown-item" onClick={(e) => setInputtedIngredient(ingredient)}>{ingredient}</a>
                                        </li>)
                                    )}
                                </ul>}
                            </div>
                            <button className="golden-button-small ms-2"><FaPlus /></button>
                        </div>
                        <div>
                            {currentDrink?.ingredients.map((ingredient) => (
                                <div className="d-flex flex-row mt-2">
                                    <div className="mxr-med-gold w-100">{ingredient}</div>
                                    <button className="red-button-small ms-2"><FaTrashCan /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                <div className="spacer-s"></div>

                <div className="row">
                    <div className="col-3">
                        <h4 className="mxr-med-gold">Measurements:</h4>
                    </div>
                    <div className="col-9">
                        <div className="d-flex flex-row">
                            <input type="text" className="form-control w-100" />
                            <button className="golden-button-small ms-2"><FaPlus /></button>
                        </div>
                        <div>
                            {currentDrink?.measures.map((measure) => (
                                <div className="d-flex flex-row mt-2">
                                    <div className="mxr-med-gold w-100">{measure}</div>
                                    <button className="red-button-small ms-2"><FaTrashCan /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                <div className="spacer-s"></div>

                <div className="row">
                    <div className="col-3">
                        <h4 className="mxr-med-gold">Directions:</h4>
                    </div>
                    <div className="col-9">
                        <input type="text" className="form-control w-100" placeholder={currentDrink?.strInstructions}
                            onChange={(e) => setCurrentDrink({ ...currentDrink, strInstructions: e.target.value })} />
                    </div>
                </div>
                <div className="spacer-s"></div>

                <div className="float-end">
                    <Link to={`/Cocktail/${id}`}>
                        <button className="golden-button-small-outline me-2">Cancel</button>
                    </Link>
                    <button className="golden-button-small">Save</button>
                </div>
            </div>
        </div>
    )
}

export default EditCocktail;