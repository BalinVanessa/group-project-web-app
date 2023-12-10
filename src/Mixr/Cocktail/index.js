import { FaStar } from "react-icons/fa6";
import db from "../Database";
import { useParams } from "react-router";

function Cocktail() {
    const { id } = useParams(); //grabs drinkID
    const drinks = db.drinks;
    const currentDrink = drinks.find((drink) => drink.id == id)

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
        <div>
            <div className="mxr-light-blue-bg p-5 d-flex flex-row">
                <img className="cocktail-image" src={currentDrink.image}></img>
                <div className="ps-5">
                    <h1 className="mxr-dark-gold">{currentDrink.name}</h1>
                    <div className="mxr-light-gold">
                        {makeStars(currentDrink.numStars)}
                    </div>
                    <div className="spacer-m"></div>
                    <h5 className="mxr-light-gold">{currentDrink.description}</h5>
                    <div className="spacer-m"></div>
                    <h5 className="mxr-dark-gold">Ingredients:</h5>
                    <p>
                        <ul className="mxr-light-gold">
                            <li>Map list of ingredients here</li>
                            <li>Map list of ingredients here</li>
                            <li>Map list of ingredients here</li>
                        </ul>
                    </p>
                    <div className="spacer-s"></div>
                    <h5 className="mxr-dark-gold">Recipe:</h5>
                    <p>
                        <ol className="mxr-light-gold">
                            <li>Map recipe here</li>
                            <li>Map recipe here</li>
                            <li>Map recipe here</li>
                        </ol>
                    </p>
                </div>
            </div>
            
            <div className="">

            </div>
        </div>
    );
}

export default Cocktail;