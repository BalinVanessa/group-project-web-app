import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

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
    const [currentIngredients, setCurrentIngredients] = useState();
    const [inputtedMeasure, setInputtedMeasure] = useState();

    const navigate = useNavigate();

    //gets a drink by its ID
    const fetchDrink = async () => {
        const drink = await ourDrinksClient.findDrinkById(id);
        setCurrentDrink(drink);
        fetchCurrentIngredients(drink);
    };

    //gets an ingredient by its ID
    const fetchIngredient = async (id) => {
        console.log(id);

        const mixrIngredient = await ingredientClient.findMixrIngredientById(id);
        if (!mixrIngredient) {
            const externalIngredient = await ingredientClient.findExternalIngredientById(id);
            console.log(externalIngredient)
            return externalIngredient;
        } else {
            return mixrIngredient;
        }
    }

    //gets a list of the current ingredients in the drink
    const fetchCurrentIngredients = async (drink) => {
        if (drink && drink.ingredients) {
            const ingredientPromises = drink.ingredients.map((ingredient) => fetchIngredient(ingredient));
            const currentIngredients = await Promise.all(ingredientPromises);
            setCurrentIngredients(currentIngredients);
            console.log(currentIngredients);
        }
    };

    //updates the drink and navigates back to the cocktail page
    const updateDrink = async () => {
        const drink = await ourDrinksClient.updateDrink(currentDrink);
        navigate(`/Cocktail/${id}`);
    }

    //delete drink and navigate back to the home page
    const deleteDrink = async () => {
        const drink = await ourDrinksClient.deleteDrink(currentDrink);
        navigate('/Home')
    }

    //adds a new ingredient to the current list of ingredients for a drink
    const addIngredient = async (newIngredientName) => {
        const newIngredient = await (ingredientClient.findExternalIngredientByName(newIngredientName) || ingredientClient.findMixrIngredientByName(newIngredientName));
        console.log(newIngredient);
        const updatedDrink = {
            ...currentDrink,
            ingredients: [...currentDrink?.ingredients, newIngredient.idIngredient]
        };
        console.log(updatedDrink);
        const drink = await ourDrinksClient.updateDrink(updatedDrink);
        console.log(drink);
        fetchCurrentIngredients(drink);
    }

    //adds a new measurement to the current list of measurements for a drink
    const addMeasurement = async (newMeasurement) => {
        const updatedDrink = {
            ...currentDrink,
            measures: [...currentDrink?.measures, newMeasurement]
        };
        const drink = await ourDrinksClient.updateDrink(updatedDrink);
    }

    //deletes an ingredient from the current list of ingredients for a drink
    const deleteIngredient = async (ingredient) => {
        const updatedDrink = {
            ...currentDrink,
            ingredients: [...currentDrink.ingredients.filter((item) => item !== ingredient.idIngredient)]
        };
        const drink = await ourDrinksClient.updateDrink(updatedDrink);
    };

    //delete a new measurement from the current list of measurements for a drink
    const deleteMeasurement = async (indexRemoved) => {
        console.log(indexRemoved);
        console.log(currentDrink.measures);
    
        const updatedDrink = {
            ...currentDrink,
            measures: [...currentDrink.measures.filter((item, index) => ((index) !== indexRemoved))]
        }
        console.log(updatedDrink);
        const drink = await ourDrinksClient.updateDrink(updatedDrink);
    }

    //autofills the ingredient
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

    useEffect(() => {
        fetchDrink();
    }, []);

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
                        <h4 className="mxr-med-gold labels">Ingredients:</h4>
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
                            <button onClick={() => addIngredient(inputtedIngredient)} className="golden-button-small ms-2"><FaPlus /></button>
                        </div>
                        <div>
                            {console.log(currentIngredients)}
                            {currentIngredients?.map((ingredient) => (
                                <div key={ingredient?.idDrink} className="d-flex flex-row mt-2">
                                    <div className="mxr-med-gold w-100">{ingredient?.strIngredient}</div>
                                    <button onClick={() => deleteIngredient(ingredient)} className="red-button-small ms-2"><FaTrashCan /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                <div className="spacer-s"></div>

                <div className="row">
                    <div className="col-3">
                        <h4 className="mxr-med-gold labels">Measurements:</h4>
                    </div>
                    <div className="col-9">
                        <div className="d-flex flex-row">
                            <input type="text" 
                            className="form-control w-100" 
                            id="measurement"
                            onChange={(e) => setInputtedMeasure(e.target.value)}/>
                            <button onClick={() => addMeasurement(inputtedMeasure)} className="golden-button-small ms-2"><FaPlus /></button>
                        </div>
                        <div>
                            {currentDrink?.measures.map((measure, index) => (
                                <div className="d-flex flex-row mt-2">
                                    <div className="mxr-med-gold w-100">{measure}</div>
                                    <button onClick={() => deleteMeasurement(index)} className="red-button-small ms-2"><FaTrashCan /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                <div className="spacer-s"></div>

                <div className="row">
                    <div className="col-3">
                        <h4 className="mxr-med-gold labels">Directions:</h4>
                    </div>
                    <div className="col-9">
                        <input type="text" className="form-control w-100" value={currentDrink?.strInstructions}
                            onChange={(e) => setCurrentDrink({ ...currentDrink, strInstructions: e.target.value })} />
                    </div>
                </div>
                <div className="spacer-m"></div>

                <div className="float-end">
                    <Link to={`/Cocktail/${id}`}>
                        <button className="golden-button-med-outline me-2">Discard changes</button>
                    </Link>
                    <button onClick={deleteDrink} className="red-button-medium me-2">Delete recipe</button>
                    <button onClick={updateDrink} className="golden-button-small">Update</button>
                </div>
            </div>
        </div>
    )
}

export default EditCocktail;