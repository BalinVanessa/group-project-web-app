import { FaStar, FaStarHalf } from "react-icons/fa6";
import { useParams } from "react-router";
import db from "../../Database";

function MixologistProfile(currentUser) {
    /** 
    const drinks = db.drinks;
    const favDrinks = currentUser.favoriteDrinks;

    function getDrink(drinkID) {
        return (drinks.find((drink) => drink.id == drinkID))
    }

    function getDrinksMadeByUser(currentUser) {
        const drinksMade = [];
        drinksMade.push(drinks.find((drink) => drink.creator == currentUser.userID));
        return drinksMade;
    }
    const usersDrinks = getDrinksMadeByUser();

    function makeStars(num) {
        const arr = [];
        for (let i = 0; i < num; i++) {
            arr.push(
                <FaStar />
            );
        }
        return arr;
    }

    return (
        <div>
            <h3 className="mxr-med-gold">Your Recipes</h3>
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
    */
}

export default MixologistProfile;