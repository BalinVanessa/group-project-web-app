import { useEffect, useState } from "react";
import * as ourDrinksClient from "../Clients/ourDrinksClient";
import * as reviewsClient from "../Clients/reviewsClient";
import * as usersClient from "./../Users/usersClient";
import { Link, useNavigate } from "react-router-dom";
import { FaPencil, FaS, FaStar, FaStarHalf, FaTrashCan } from "react-icons/fa6";
import { useSelector } from "react-redux";

function ReviewCard({ review, refreshFunc }) {
    const { currentUser } = useSelector((state) => state.userReducer);
    const [drink, setDrink] = useState(null);
    const [reviewUser, setReviewUser ] = useState(null);

    const navigate = useNavigate();

    const fetchDrink = async () => {
        const drink = await ourDrinksClient.findDrinkById(review.idDrink);
        console.log(drink);
        setDrink(drink);
    }

    const fetchReviewUser = async(userId) => {
        const userResponse = await usersClient.findUserById(userId);

        setReviewUser(userResponse);
    }

    const deleteReview = async () => {
        const status = await reviewsClient.deleteReview(review);
        console.log("Review deleted!");
        // refreshFunc is what is called to update the reviews on the page
        // ex: updating the list of reviews on Profile or cocktail page
        // this should be the function that fetches reviews for that page.
        refreshFunc();
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
        fetchReviewUser(review.user);
    }, [review]);

    return (
        <div className="review">
            <div className="row justify-content-center w-100">
                <img className="review-img col-8 col-sm-6 col-md-3 col-lg-2 mb-5 mb-lg-0" src="./Images/thegoat.jpg" />
                <div className="review-text col-12 col-lg-8">
                    <Link to={`/Cocktail/${review.idDrink}`} className="no-underline">
                        <h4 className="mxr-med-gold">{drink && drink.strDrink}</h4>
                    </Link>
                    {reviewUser && <Link className="no-underline" to={`/Profile/${reviewUser._id}`}>
                        <h5 className="mxr-med-gold">{reviewUser?.username}</h5>
                    </Link>}
                    <div className="d-inline">
                        {makeStars(review.numStars)}
                    </div>
                    <p className="mt-3">{review.reviewText}</p>
                </div>
                {currentUser && currentUser._id === review.user ?
                    <div className="d-flex justify-content-end col-12 col-lg-2">
                        <Link to={`/EditReview/${review._id}`} className="no-underline">
                            <FaPencil className="mxr-med-gold icon-size-lg m-2" />
                        </Link>
                        <FaTrashCan onClick={deleteReview} className="mxr-med-gold icon-size-lg m-2" />
                    </div>:
                    <div className="col-12 col-lg-2"> </div>}
            </div>
        </div>
    )
}

export default ReviewCard;