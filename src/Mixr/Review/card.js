import { useEffect, useState } from "react";
import * as ourDrinksClient from "../Clients/ourDrinksClient";
import { Link, useNavigate } from "react-router-dom";
import { FaS, FaStar, FaStarHalf } from "react-icons/fa6";

function ReviewCard({ review }) {
    const [drink, setDrink] = useState(null);

    const fetchDrink = async () => {
        const drink = await ourDrinksClient.findDrinkById(review.idDrink);
        console.log(drink);
        setDrink(drink);
    }

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

    useEffect(() => {
        fetchDrink();
    }, [review]);

    return (
        <div className="review d-flex">
            <img className="review-img circle-img me-5" src="./Images/thegoat.jpg" />
            <div className="review-text">
                <Link to={`/Cocktail/${review.idDrink}`} className="no-underline">
                    <h4 className="mxr-med-gold">{drink && drink.strDrink}</h4>
                </Link>
                <div className="d-inline">
                    {makeStars(review.numStars)}
                </div>
                <p className="mt-3">{review.reviewText}</p>
            </div>
        </div>
    )
}

export default ReviewCard;