import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { FaPlus } from "react-icons/fa6";
import { FaTrashCan } from "react-icons/fa6";

import * as ourDrinksClient from "../Clients/ourDrinksClient";
import './index.css';


function EditCocktail() {
    const { id } = useParams(); //grabs drinkID
    const [currentDrink, setCurrentDrink] = useState(null);

    const fetchDrink = async () => {
        const drink = await ourDrinksClient.findDrinkById(id);
        setCurrentDrink(drink);
    };
    /*
    const saveDrink = async () => {
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
                            <input type="text" className="form-control w-100" />
                            <button className="golden-button-small ms-2"><FaPlus/></button>
                        </div>
                        <div className="d-flex flex-row mt-2">
                            <div className="mxr-med-gold w-100">Add items here</div>
                            <button className="red-button-small ms-2"><FaTrashCan/></button>
                        </div>
                        <div className="d-flex flex-row mt-2">
                            <div className="mxr-med-gold w-100">Add items here</div>
                            <button className="red-button-small ms-2"><FaTrashCan/></button>
                        </div>
                        <div className="d-flex flex-row mt-2">
                            <div className="mxr-med-gold w-100">Add items here</div>
                            <button className="red-button-small ms-2"><FaTrashCan/></button>
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
                            <button className="golden-button-small ms-2"><FaPlus/></button>
                        </div>
                        <div className="d-flex flex-row mt-2">
                            <div className="mxr-med-gold w-100">Add items here</div>
                            <button className="red-button-small ms-2"><FaTrashCan/></button>
                        </div>
                        <div className="d-flex flex-row mt-2">
                            <div className="mxr-med-gold w-100">Add items here</div>
                            <button className="red-button-small ms-2"><FaTrashCan/></button>
                        </div>
                        <div className="d-flex flex-row mt-2">
                            <div className="mxr-med-gold w-100">Add items here</div>
                            <button className="red-button-small ms-2"><FaTrashCan/></button>
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