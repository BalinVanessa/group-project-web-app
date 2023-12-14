import { useEffect, useState } from "react";
import * as ourDrinksClient from "../../Clients/ourDrinksClient"
import * as reviewsClient from "../../Clients/reviewsClient";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaPencil, FaS, FaStar, FaStarHalf, FaTrashCan } from "react-icons/fa6";
import { useSelector } from "react-redux";

function EditReview() {
    const { reviewID } = useParams();

    const [review, setReview] = useState(null);
    const [drink, setDrink] = useState(null);

    const navigate = useNavigate();

    const fetchReview = async () => {
        const review = await reviewsClient.findReviewById(reviewID);
        console.log("setting Review!");
        setReview(review);
    }

    const fetchDrink = async () => {
        const drink = await ourDrinksClient.findDrinkById(review && review.idDrink);
        console.log(drink);
        setDrink(drink);
    }

    const editReview = async () => {
        if (review && drink) {
            const editedReview = await reviewsClient.editReview(review);
            console.log("creating review!");
            navigate(`/Cocktail/${drink.idDrink}`);
        }
    }

    useEffect(() => {
        fetchReview();
    }, []);

    useEffect(() => {
        fetchDrink();
    }, [review]);

    return (
        <div className="mxr-container-smaller">
            <div className="mt-5">
                <h1 className="mxr-med-gold">Edit Review for {drink && drink.strDrink}</h1>
            </div>

            <div className="mt-5">
                <div className="row mb-5">
                    <div className="col-3">
                        <h4 className="mxr-med-gold"># of Stars</h4>
                    </div>
                    <div className="col-9">
                        <input
                            type="number"
                            className="form-control w-100"
                            value={review && review.numStars}
                            onChange={(e) => setReview({ ...review, numStars: e.target.value })}
                            min="0"
                            max="5"
                            step="1" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <h4 className="mxr-med-gold">Your Review</h4>
                    </div>
                    <div className="col-9">
                        {review &&
                            (<input
                                type="text"
                                className="form-control w-100"
                                placeholder="Write how you feel about this cocktail"
                                value={review.reviewText}
                                onChange={(e) => setReview({ ...review, reviewText: e.target.value })} />)}
                    </div>
                </div>
                <br></br>

                {review && drink &&
                    (<div className="float-end">
                        <Link to={`/Cocktail/${drink.idDrink}`}>
                            <button className="golden-button-small-outline me-2">Cancel</button>
                        </Link>

                        <button onClick={editReview} className="golden-button-small">Save</button>
                    </div>)}
            </div>
        </div>
    )
}

export default EditReview;