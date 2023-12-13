import { FaStar } from "react-icons/fa6";
import { RiPencilFill } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";

import { Link, useLocation, useParams } from "react-router-dom";
import * as ourDrinksClient from "../Clients/ourDrinksClient";
import * as userClient from "../Users/usersClient";

function Cocktail() {
    const { id } = useParams(); //grabs drinkID
    const [currentDrink, setCurrentDrink] = useState(null);
    //const [mixologistName, setMixologistName] = useState(null);

    /*
    const getUserWhoMadeDrink = async  (userID) => {
        const user = await userClient.findUserById(userID);
        return await user;
    }
    */

    const fetchDrink = async () => {
        const drink = await ourDrinksClient.findDrinkById(id);
        setCurrentDrink(drink);
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
    }, [id]);

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
            <div className="mxr-light-blue-bg d-flex flex-row">
                <img className="cocktail-image" src="./Images/Negroni.jpg"></img>
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
                        {currentDrink?.measures.map((measurement, index) => (
                            <li key={index}>{measurement} {currentDrink?.ingredients[index]}</li>
                        ))}
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