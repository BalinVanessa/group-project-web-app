import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import db from "../Database"
import * as ourDrinksClient from "../Clients/ourDrinksClient";


function EditCocktail() {
    const { idDrink } = useParams(); //grabs drinkID
    //const drinks = db.drinks;

    const [currentDrink, setCurrentDrink] = useState(null);
    const navigate = useNavigate();
    const fetchDrink = async () => {
        const drink = await ourDrinksClient.findDrinkById(idDrink);
        setCurrentDrink(drink);
    };
    const saveDrink = async () => {
        await ourDrinksClient.updateDrink(currentDrink);
    };

    useEffect(() => {
        fetchDrink();
        saveDrink();
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
                        <input type="text" className="form-control w-100" placeholder={currentDrink.strDrink} 
                        onChange={(e) => setCurrentDrink({ ...currentDrink, strDrink: e.target.value })}/>
                    </div>
                </div>
                <br></br>

                <div className="row">
                    <div className="col-3">
                        <h4 className="mxr-med-gold">Description:</h4>
                    </div>
                    <div className="col-9">
                        <textarea className="form-control w-100" rows="6" placeholder={currentDrink.description} 
                        onChange={(e) => setCurrentDrink({ ...currentDrink, description: e.target.value })}/>
                    </div>
                </div>
                <br></br>

                <div className="row">
                    <div className="col-3">
                        <h4 className="mxr-med-gold">Alcoholic/Non-alcoholic</h4>
                    </div>
                    <div className="col-9">
                        <input type="radio" id="alcoholic" name="drinkType" 
                        onChange={(e) => setCurrentDrink({ ...currentDrink, strAlcoholic: e.target.value })}/>
                        <label for="alcoholic">Alcoholic</label>
                        <br></br>
                        <input type="radio" id="non-alcoholic" name="drinkType"
                        onChange={(e) => setCurrentDrink({ ...currentDrink, strAlcoholic: e.target.value })}/>
                        <label for="non-alcoholic">Non-Alcoholic</label>
                    </div>
                </div>

                <div className="row">
                    <div className="col-3">
                        <h4 className="mxr-med-gold">Ingredients:</h4>
                    </div>
                    <div className="col-9">
                        <input type="text" className="form-control w-100" />
                    </div>
                </div>
                <br></br>

                <div className="row">
                    <div className="col-3">
                        <h4 className="mxr-med-gold">Directions:</h4>
                    </div>
                    <div className="col-9">
                        <input type="text" className="form-control w-100" placeholder={currentDrink.strInstructions} 
                        onChange={(e) => setCurrentDrink({ ...currentDrink, strInstructions : e.target.value })}/>
                    </div>
                </div>
                <br></br>

                <div className="float-end">
                    <Link to={`/Cocktail/${idDrink}`}>
                        <button className="golden-button-small-outline me-2">Cancel</button>
                    </Link>
                    <button onClick={saveDrink} className="golden-button-small">Save</button>
                </div>
            </div>
        </div>
    )
}

export default EditCocktail;