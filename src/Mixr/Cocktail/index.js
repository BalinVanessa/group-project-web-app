import { FaStar } from "react-icons/fa6";
import { RiPencilFill } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";

import { Link, useLocation, useParams } from "react-router-dom";
import * as ourDrinksClient from "../Clients/ourDrinksClient";
import * as ingredientClient from "../Clients/ingredientsClient";
import { ReviewCard } from "../Review/card";

function Cocktail() {
    const { id } = useParams(); //grabs drinkID
    const [currentDrink, setCurrentDrink] = useState(null);
    const [currentIngredients, setCurrentIngredients] = useState(null);
    //const [mixologistName, setMixologistName] = useState(null);

    /*
    const getUserWhoMadeDrink = async  (userID) => {
        const user = await userClient.findUserById(userID);
        return await user;
    }
    */

    //gets a drink by its ID
    const fetchDrink = async () => {
        const drink = await ourDrinksClient.findDrinkById(id);
        setCurrentDrink(drink);
        fetchCurrentIngredients(drink);
    };

    //gets the name of an ingredient when passed its ID
    const fetchIngredientName = async (id) => {
        console.log(id);

        const mixrIngredient = await ingredientClient.findMixrIngredientById(id);
        if (!mixrIngredient) {
            const externalIngredient = await ingredientClient.findExternalIngredientById(id);
            console.log(externalIngredient)
            return externalIngredient.strIngredient;
        } else {
            return mixrIngredient.strIngredient;
        }
    }

    //gets a list of the names of the current ingredients in the drink
    const fetchCurrentIngredients = async (drink) => {
        if (drink && drink.ingredients) {
            const ingredientPromises = drink.ingredients.map((ingredient) => fetchIngredientName(ingredient));
            const currentIngredients = await Promise.all(ingredientPromises);
            setCurrentIngredients(currentIngredients);
            console.log(currentIngredients);
        }
    };

    /*
    const fetchMixologistName = async () => {
        const mixologist = await getUserWhoMadeDrink(currentDrink?.mixologist).username;
        setMixologistName(mixologist);
    }
    */


    useEffect(() => {
        fetchDrink();
        //fetchMixologistName();
    }, []);

    // generates the given amount of star icons
    function makeStars(num) {
        const arr = [];
        for (let i = 0; i < num; i++) {
            arr.push(
                <FaStar />
            );
        }
        return arr;
    };

    return (
        <div className="p-5">
            <div className="mxr-light-blue-bg d-flex flex-row flex-wrap justify-content-center">
                <img className="cocktail-image mb-5" src="./Images/Negroni.jpg"></img>
                <div className="ps-5">
                    <div className="d-flex flex-row">
                        <h1 className="mxr-dark-gold">{currentDrink?.strDrink}</h1>
                        <Link to={"#"}>
                            <button className="golden-button-small ms-5"><FaRegHeart /></button>
                        </Link>

                        <Link to={`/EditCocktail/${id}`}>
                            <button className="golden-button-small ms-2"><RiPencilFill /></button>
                        </Link>
                    </div>
                    <div className="mxr-light-gold">
                        {makeStars(4)}
                    </div>
                    <div className="spacer-s"></div>
                    <p className="mxr-light-gold">Made by: {currentDrink?.mixologist}</p>

                    <div className="spacer-m"></div>

                    <h5 className="mxr-dark-gold">Drink Type:</h5>
                    <p className="mxr-light-gold">
                        {currentDrink?.strAlcoholic}
                    </p>
                    <div className="spacer-s"></div>

                    <h5 className="mxr-dark-gold">Ingredients:</h5>
                    <ul className="mxr-light-gold">
                        {currentDrink?.measures?.map((measurement, index) => (
                            currentIngredients && 
                            <li key={index}>{measurement} {currentIngredients[index]}</li>)
                        )}
                    </ul>
                    <div className="spacer-s"></div>
                    <h5 className="mxr-dark-gold">Directions:</h5>
                    <p className="mxr-light-gold">
                        {currentDrink?.strInstructions}
                    </p>
                </div>
            </div>

            <div className="spacer-m"></div>
            <div className="pt-3 text-center">
                <Link to={`/Review`}>
                    <button className="golden-button-medium">Add a review</button>
                </Link>
            </div>

            <h3 className="mxr-med-gold mt-5">Reviews</h3>
            <div className="mt-4 w-100">
                <div className="review d-flex">
                    <img className="review-img circle-img me-5" src="./Images/thegoat.jpg" />
                    <div className="review-text">
                        <h4>Espresso Martini</h4>
                        <div className="d-inline">
                            {makeStars(4)}
                        </div>
                        <p className="mt-3">Yummy.</p>
                    </div>
                </div>

                <div className="review d-flex">
                    <img className="review-img circle-img me-5" src="./Images/thegoat.jpg" />
                    <div className="review-text">
                        <h4>Espresso Martini</h4>
                        <div className="d-inline">
                            {makeStars(4)}
                        </div>
                        <p className="mt-3">Yummy.</p>
                    </div>
                </div>

                <div className="review d-flex">
                    <img className="review-img circle-img me-5" src="./Images/thegoat.jpg" />
                    <div className="review-text">
                        <h4>Espresso Martini</h4>
                        <div className="d-inline">
                            {makeStars(4)}
                        </div>
                        <p className="mt-3">Yummy.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cocktail;