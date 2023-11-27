import { FaS, FaStar, FaStarHalf } from "react-icons/fa6";
import { useParams } from "react-router";
import db from "../../Database";

function DrinkerProfile({ currentUser }) {
    // the drink database
    const drinks = db.drinks;

    // get the drink from the drink JSON file based on the unique id
    function getDrink(drinkID) {
        return (drinks.find((drink) => drink.id == drinkID))
    }

    // the user's fav drinks, obtained from their ids
    const favDrinks = currentUser.favoriteDrinks.map((id) => getDrink(id));

    // generates the given amount of star icons
    function makeStars(num) {
        const arr = [];
        for (let i = 0; i < num; i++) {
            arr.push(
                <FaStar />
            );
        }
        return arr;
    }

    // Still need to implement following (might make this own component)
    // Still need to implement reviews (might make this own component)
    return (
        <div>
            <h3 className="mxr-med-gold">Your Favorite Recipes</h3>
            <div className="d-inline-flex cardRow mt-5 w-100">
                {favDrinks.map((drink) => (
                    <div className="drinkCard mxr-med-blue-bg">
                        <img className="drinkCard-img" src="./Images/VodkaCran.jpg" />
                        <div className="drinkCard-text">
                            <h4>{drink.name}</h4>
                            <div className="d-inline">
                                {makeStars(drink.numStars)}
                            </div>
                            <p>{drink.description.substring(0, 128) + "..."}</p>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default DrinkerProfile;