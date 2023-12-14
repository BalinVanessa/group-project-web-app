import { FaStar } from "react-icons/fa6";
import { RiPencilFill } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa6";

import { Link, useLocation, useParams } from "react-router-dom";
import * as ourDrinksClient from "../Clients/ourDrinksClient";
import * as ingredientClient from "../Clients/ingredientsClient";
import * as usersClient from "./../Users/usersClient";
import * as reviewsClient from "./../Clients/reviewsClient.js";
import * as favoritesClient from "./../Clients/favoritesClient.js";
import * as externalDrinksClient from './../Clients/externalDrinksClient.js';
import ReviewCard from "./../Review/card.js";
import { useSelector } from "react-redux";

function Cocktail() {
    const { currentUser } = useSelector((state) => state.userReducer);
    const { id } = useParams(); //grabs drinkID
    const [currentDrink, setCurrentDrink] = useState(null);
    const [currentIngredients, setCurrentIngredients] = useState(null);
    const [mixologistName, setMixologistName] = useState(null);
    const [mixologist, setMixologist] = useState(null);
    const [drinkReviews, setDrinkReviews] = useState(null);
    const [isFavorited, setIsFavorited] = useState(null);

    //gets a drink by its ID
    const fetchDrink = async () => {
        const drink = await ourDrinksClient.findDrinkById(id);
        if (!drink) {
            const externalDrink = await externalDrinksClient.findExternalDrinksByID(id);
            setCurrentDrink(externalDrink);
            fetchCurrentExternalIngredients(externalDrink);
            fetchDrinkReviews(externalDrink);
            fetchIsFavorited(externalDrink);
        } else {
            setCurrentDrink(drink);
            fetchCurrentIngredients(drink);
            fetchMixologist(drink.mixologist);
            fetchDrinkReviews(drink);
            fetchIsFavorited(drink);
        }
    };

    const fetchDrinkReviews = async (drink) => {
        const reviews = await reviewsClient.findReviewsForDrink(drink);

        setDrinkReviews(reviews);
    }

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

    const fetchCurrentExternalIngredients = async (externalDrink) => {
        if (externalDrink) {
            const ingredients = [];
            for (let i = 1; i < 15; i++) {
                const ingredientProperty = `strIngredient${i}`;
                const strIngredient = externalDrink[`${ingredientProperty}`];

                if (strIngredient) {
                    ingredients.push(strIngredient);
                }
            }

            setCurrentIngredients(ingredients);
            fetchCurrentExternalMeasurements(externalDrink);
        }
    }

    const fetchCurrentExternalMeasurements = async (externalDrink) => {
        if (externalDrink && currentIngredients) {
            const measures = [];
            for (let i = 1; i <= currentIngredients.length; i++) {
                const measureProperty = `strMeasure${i}`;
                const strMeasure = externalDrink[`${measureProperty}`];

                if (strMeasure) {
                    measures.push(strMeasure);
                }
            }

            setCurrentDrink({
                ...externalDrink,
                measures: measures
            })
        }
    }

    const fetchMixologist = async (mixologistId) => {
        const mixologist = await usersClient.findUserById(mixologistId);
        if (mixologist) {
            setMixologistName(mixologist.username);
            setMixologist(mixologist);
        }
    }

    const fetchIsFavorited = async (drink) => {
        const favorites = await favoritesClient.findUsersThatFavDrink(drink.idDrink);

        if (currentUser) {
            const userHasFavorited = favorites.find((favorite) => favorite.user._id === currentUser._id);
            userHasFavorited ? setIsFavorited(true) : setIsFavorited(false);
        } else {
            setIsFavorited(false);
        }
    }

    const favoriteDrink = async () => {
        console.log("favoriting drink")
        await favoritesClient.createUserFavDrink(currentUser._id, currentDrink.idDrink);
        setIsFavorited(true);
    }

    const unfavoriteDrink = async () => {
        console.log("unfavoriting drink")
        await favoritesClient.deleteUserFavDrink(currentUser._id, currentDrink.idDrink);
        setIsFavorited(false);
    }

    useEffect(() => {
        fetchDrink();
    }, [isFavorited]);

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
                <img className="cocktail-image mb-5" src={currentDrink?.strDrinkThumb || "./Images/thegoat.jpg"}></img>
                <div className="ps-5">
                    <div className="d-flex flex-row">
                        <h1 className="mxr-dark-gold">{currentDrink?.strDrink}</h1>
                        {currentUser && (isFavorited ?
                            <button className="golden-button-small ms-5" onClick={unfavoriteDrink}>
                                <FaRegHeart />
                            </button>
                            :
                            <button className="golden-button-small ms-5" onClick={favoriteDrink}>
                                <FaHeart />
                            </button>
                        )
                        }

                        {mixologist && (currentUser?._id === mixologist?._id && <Link to={`/EditCocktail/${id}`}>
                            <button className="golden-button-small ms-2"><RiPencilFill /></button>
                        </Link>)}
                    </div>
                    <div className="mxr-light-gold">
                        {makeStars(4)}
                    </div>
                    <div className="spacer-s"></div>
                    <h5 className="mxr-light-gold">Made by: {currentDrink?.mixologist ? <Link className="no-underline" to={`/Profile/${currentDrink.mixologist}`}>
                        <span className="mxr-med-gold">{mixologistName}</span>
                    </Link> : "Anonymous"}
                    </h5>

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

            <hr className="smaller" />
            <hr />
            <hr className="smaller" />

            <div className="spacer-m"></div>
            <div className="pt-3 text-center">
                <Link to={`/MakeReview/${currentDrink?.idDrink}`}>
                    <button className="golden-button-medium">Add a review</button>
                </Link>
            </div>
            <h3 className="mxr-med-gold mt-5">Reviews</h3>
            <div className="mt-4 w-100">
                {drinkReviews?.map((review) => (
                    <ReviewCard review={review} refreshFunc={fetchDrink} />
                ))}
            </div>
        </div>
    );
}

export default Cocktail;