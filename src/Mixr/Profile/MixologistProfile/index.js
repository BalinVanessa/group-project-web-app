import { FaS, FaStar, FaStarHalf } from "react-icons/fa6";
import * as followsClient from "../../Clients/followsClient";
import * as favoritesClient from "../../Clients/favoritesClient";
import * as ourDrinksClient from "../../Clients/ourDrinksClient";
import * as reviewsClient from "../../Clients/reviewsClient";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import ReviewCard from "../../Review/card";
import DrinkCard from "../../DrinkCard/DrinkCard";

function MixologistProfile({ profile }) {
    const [following, setFollowing] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [createdDrinks, setCreatedDrinks] = useState([]);
    const [reviews, setReviews] = useState([]);
    const { currentUser } = useSelector((state) => state.userReducer);
    const { userID } = useParams();


    // get the drink from the drink JSON file based on the drink id
    const getDrink = async (drinkID) => {
        const drink = await ourDrinksClient.findDrinkById(drinkID);
        console.log(drink);
        return await drink;
    }

    // the reviews that the user has made
    const fetchReviews = async () => {
        const reviews = await reviewsClient.findReviewsFromUser(profile);
        setReviews(reviews);
    }

    // the mixologist's created drinks
    const fetchCreatedDrinks = async () => {
        const drinks = await ourDrinksClient.findDrinksByMixologist(profile);
        setCreatedDrinks(drinks);
    }

    // the user's fav drinks, obtained from their ids
    // const favDrinks = profile.favoriteDrinks.map((id) => getDrink(id));
    const fetchUserFavorites = async () => {
        // get all favorite objects involving the profile user
        const favs = await favoritesClient.findDrinksThatUserFav(profile._id);
        // get the drinks
        const userFavDrinks = await Promise.all(favs.map((favorite) => getDrink(favorite.idDrink)));
        console.log(userFavDrinks);
        setFavorites(userFavDrinks);
        console.log(userFavDrinks);
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

    // the user's followers 
    const fetchFollowers = async () => {
        const follows = await followsClient.findFollowersOfUser(profile._id);
        const followers = follows.map((follow) => follow.follower);
        setFollowers(followers);
    }

    // who the user is following
    const fetchFollowing = async () => {
        const follows = await followsClient.findFollowedUsersByUser(profile._id);
        const following = follows.map((follow) => follow.followed);
        setFollowing(following);
    }

    useEffect(() => {
        fetchFollowers();
        fetchFollowing();
        fetchUserFavorites();
        fetchCreatedDrinks();
        fetchReviews();
    }, [userID, profile]);

    return (
        <div>
            {currentUser && currentUser._id === userID && (
                <div className="text-center">
                    <Link to={`/AddCocktail/${currentUser._id}`}>
                        <button className="golden-button-large">Create New Cocktail</button>
                    </Link>
                    <div className="spacer-l"></div>
                </div>
            )}

            <div className="flush-right">
                <h3 className="mxr-med-gold">{profile.firstName}'s Created Recipes</h3>
                <div className="d-inline-flex cardRow mt-4 w-100">
                    {createdDrinks && createdDrinks.map((drink) => (
                        <DrinkCard drink={drink} />
                    ))}
                </div>

                <h3 className="mxr-med-gold mt-5">{profile.firstName}'s Favorite Recipes</h3>
                <div className="d-inline-flex cardRow mt-4 w-100">
                    {favorites.map((drink) => (
                        <DrinkCard drink={drink} />
                    ))}
                </div>

                <h3 className="mxr-med-gold mt-5">Followers</h3>
                <div className="d-inline-flex cardRow mt-4 w-100">
                    {followers.map((follower) => (
                        <Link to={`/Profile/${follower._id}`} className="profile-card no-underline">
                            <img className="circle-img mb-4" src="./Images/thegoat.jpg" />
                            <h5 className="mxr-light-gold">{follower.firstName} {follower.lastName}</h5>
                        </Link>
                    ))}
                </div>

                <h3 className="mxr-med-gold mt-5">Following</h3>
                <div className="d-inline-flex cardRow mt-4 w-100">
                    {following.map((follow) => (
                        <Link to={`/Profile/${follow._id}`} className="profile-card no-underline">
                            <img className="circle-img mb-4" src="./Images/thegoat.jpg" />
                            <h5 className="mxr-light-gold">{follow.firstName} {follow.lastName}</h5>
                        </Link>
                    ))}
                </div>
            </div>
            <h3 className="mxr-med-gold mt-5">Reviews</h3>
            <div className="mt-4 w-100">
                {reviews.map((review) => (
                    <ReviewCard review={review} />
                ))}
            </div>
        </div>
    )
}

export default MixologistProfile;