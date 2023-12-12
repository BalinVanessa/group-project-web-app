import { FaStar } from "react-icons/fa6";
import { RiPencilFill } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import db from "../Database";
import { Link, useLocation, useParams } from "react-router-dom";
import * as ourDrinksClient from "../Clients/ourDrinksClient";

function Cocktail() {
    const { id } = useParams(); //grabs drinkID
    const drinks = db.drinks;
    const currentDrink = async () => {
        await ourDrinksClient.findDrinkById(id);
    };
    const { userID } = useParams(); //grabs user
    const users = db.users;
    const currentUser = userID && users.find((user) => user.userID == userID);

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
                <img className="cocktail-image" src={currentDrink.image}></img>
                <div className="ps-5">
                    <div className="d-flex flex-row">
                        <h1 className="mxr-dark-gold">{currentDrink.name}</h1>
                        <Link to={"#"}>
                            <button className="golden-button-small ms-5"><FaRegHeart /></button>
                        </Link>

                        <Link to={`/EditCocktail/${id}`}>
                            <button className="golden-button-small ms-2"><RiPencilFill /></button>
                        </Link>
                    </div>
                    <div className="mxr-light-gold">
                        {makeStars(currentDrink.numStars)}
                    </div>
                    <div className="spacer-m"></div>
                    <h5 className="mxr-light-gold">{currentDrink.description}</h5>
                    <div className="spacer-m"></div>
                    <h5 className="mxr-dark-gold">Ingredients:</h5>
                    <p>
                        <ul className="mxr-light-gold">
                            <li>1.5 oz Vodka</li>
                            <li>1 tbsp Grenadine</li>
                            <li>100 ml Sprite</li>
                        </ul>
                    </p>
                    <div className="spacer-s"></div>
                    <h5 className="mxr-dark-gold">Directions:</h5>
                    <p className="mxr-light-gold">
                        Mix the ingredients, shake, pour, enjoy.
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