import { FaStar } from "react-icons/fa6";

function DrinkCard({ drink }) {
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
        <div className="drinkCard mxr-med-blue-bg">
            <div className="align-top">
                <img className="drinkCard-img" src={drink.strDrinkThumb || "./Images/thegoat.jpg"} />
            </div>
            <div className="drinkCard-text">
                <h4>{drink.strDrink}</h4>
                <div className="d-inline">
                    {makeStars(4)}
                </div>
                <p className="ellipsis-wrap">{drink.strInstructions}</p>
            </div>
        </div>
    );
}

export default DrinkCard;