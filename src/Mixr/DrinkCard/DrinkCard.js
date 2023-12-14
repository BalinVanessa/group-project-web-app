import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";

function DrinkCard({ drink, className }) {
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
        <div className={`drinkCard mxr-med-blue-bg ${className ? className : ''}`}>
            <div className="align-top">
                <img className="drinkCard-img" src={drink.strDrinkThumb || "./Images/thegoat.jpg"} />
            </div>
            <div className="drinkCard-text">
                <Link to={`/Cocktail/${drink.idDrink}`} className="no-underline mxr-med-gold">
                    <h4>{drink.strDrink}</h4>
                </Link>
                <div className="d-inline">
                    {makeStars(4)}
                </div>
                <p className="ellipsis-wrap">{drink.strInstructions}</p>
            </div>
        </div>
    );
}

export default DrinkCard;