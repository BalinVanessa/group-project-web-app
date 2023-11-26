import { FaStar, FaStarHalf } from "react-icons/fa6";
import { useParams } from "react-router";
import db from "../../Database";

function DrinkerProfile({ currentUser }) {
    const drinks = db.drinks;
    const favDrinks = currentUser.favoriteDrinks;

    function getDrink(drinkID) {
        return (drinks.find((drink) => drink.id == drinkID))
    }

    function makeStars(num) {
        const arr = [];
        for (let i = 0; i < num; i++) {
            arr.push(
                <FaStar />
            );
        }
        return arr;
    }

    // Still need to code functionality so that it loops through the user's list of fav drinks
    // Still need to implement the "next" button so you can see more cards
    // Still need to implement following (might make this own component)
    // Still need to implement reviews (might make this own component)
    return (
        <div>
            <h3 className="mxr-med-gold">Your Favorite Recipes</h3>
            <div className="d-flex mt-5">
                <div className="drinkCard mxr-med-blue-bg">
                    <img className="drinkCard-img" src="./Images/VodkaCran.jpg" />
                    <div className="drinkCard-text">
                        <h4>{getDrink(favDrinks[0]).name}</h4>
                        <div className="d-inline">
                            {makeStars(getDrink(favDrinks[0]).numStars)}
                        </div>
                        <p>{getDrink(favDrinks[0]).description.substring(0, 128) + "..."}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DrinkerProfile;