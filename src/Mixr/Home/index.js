import { useParams } from "react-router";
import SearchBar from "../Search/SearchBar";
import { GiMartini } from "react-icons/gi";
import './index.css';
import ResponsiveCenterDiv from "../Util/ResponsiveCenterDiv";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as ourDrinksClient from './../Clients/ourDrinksClient';
import * as reviewsClient from './../Clients/reviewsClient';
import DrinkCollection from "./DrinkCollection/drinkCollection";
import ReviewCard from "../Review/card";

function Home() {
    const { userID } = useParams();
    const { currentUser } = useSelector((state) => state.userReducer);
    const [recentDrinks, setRecentDrinks] = useState([]);
    const [recentReviews, setRecentReviews] = useState([]);
    const [personalRecentDrinks, setPersonalRecentDrinks] = useState([]);
    // const [popularDrinks, setPopularDrinks] = useState([]);

    // All users
    // const fetchPopularDrinks = async () => {
    //     const drinkFavsCountMap = new Map();
    //     const allFavorites = await favoritesClient.findAllFavs();

    //     // calculate sum of favorites for all drinks
    //     allFavorites.forEach((favorite) => {
    //         const drinkId = favorite.idDrink;
    //         let count = drinkFavsCountMap.get(drinkId);
    //         if (count === undefined) {
    //             drinkFavsCountMap.set(drinkId, 1);
    //         } else {
    //             drinkFavsCountMap.set(drinkId, ++count);
    //         }
    //     });

    //     // sort favs count
    //     const sortedArray = Array.from(drinkFavsCountMap).sort((a, b) => a[1] - b[1]);
    //     const sortedMap = new Map(sortedArray);

    //     const popularDrinksTempArray = [];

    //     for (let [drinkId, count] of sortedMap) {
    //         if (popularDrinks.length > 10) break;

    //         const mxrDrink = await ourDrinksClient.findDrinkById(drinkId);
    //         if (!mxrDrink) {
    //             const externalDrink = await externalDrinksClient.findExternalDrinksByID(drinkId);

    //             popularDrinksTempArray.push(externalDrink);
    //         } else {
    //             popularDrinksTempArray.push(mxrDrink);
    //         }
    //     }

    //     setPopularDrinks(popularDrinksTempArray);
    // }

    const fetchRecentDrinks = async () => {
        const allDrinks = await ourDrinksClient.findAllDrinks();

        const sortedByRecent = allDrinks.sort((a, b) => a.dateModified - b.dateModified);

        const recentDrinksLimit5 = sortedByRecent.slice(0, 5);

        setRecentDrinks(recentDrinksLimit5);
    }

    const fetchRecentReviews = async () => {
        const recentReviews = await reviewsClient.findReviewsFromUser(currentUser);

        const recentReviewsLimit5 = recentReviews.slice(0, 5);

        setRecentReviews(recentReviewsLimit5);
    }

    const fetchRecentDrinksByMixologistId = async (id) => {
        const recentDrinksByMixologist = await ourDrinksClient.findDrinksByMixologist(currentUser);

        const recentDrinksLimit5 = recentDrinksByMixologist.slice(0, 5);

        setPersonalRecentDrinks(recentDrinksLimit5);
    }

    useEffect(() => {
        fetchRecentDrinks();
        if (currentUser?.role == "DRINKER") fetchRecentReviews();
        if (currentUser?.role == "MIXOLOGIST") fetchRecentDrinksByMixologistId(currentUser._id);
    }, [])

    return (
        <div className="mxr-container mxr-light-blue-bg padding-top-50" style={{ paddingBottom: "100px" }}>
            <div className="d-flex justify-content-center title-div">
                <div className="d-flex justify-content-center align-items-center flex-column">
                    <GiMartini className="d-block mxr-med-gold martini-icon" />
                    <h1 className="mxr-med-gold d-block logo-text">mixr</h1>
                    <h5 className="mxr-light-gold">Your cocktail recipe hub</h5>
                </div>
            </div>
            <SearchBar />
            <hr className="smaller" style={{ marginTop: "65px" }} />
            <hr />
            <hr className="smaller" />
            <ResponsiveCenterDiv>
                <h1 className="mxr-med-gold" style={{ marginTop: "15px" }}>Recently Mixd</h1>
            </ResponsiveCenterDiv>
            <ResponsiveCenterDiv className={"mt-4"}>
                {recentDrinks && <DrinkCollection drinks={recentDrinks} />}
            </ResponsiveCenterDiv>
            {currentUser?.role == "DRINKER" &&
                <>
                    <hr className="smaller" style={{ marginTop: "45px" }} />
                    <hr />
                    <hr className="smaller" />
                    <ResponsiveCenterDiv>
                        <h1 className="mxr-med-gold" style={{ marginTop: "15px" }}>Your Recent Reviews</h1>
                    </ResponsiveCenterDiv>
                    {recentReviews &&
                        (recentReviews.length > 0 ?
                            <div className="">
                                {recentReviews.map((review) => (<ReviewCard review={review} />))}
                            </div>
                            :
                            <div className="w-100 d-flex justify-content-center">
                                <h3 className="mxr-light-gold">You haven't reviewed any drinks!</h3>
                            </div>
                        )}
                </>}
            {currentUser?.role == "MIXOLOGIST" &&
                <>
                    <hr className="smaller" style={{ marginTop: "45px" }} />
                    <hr />
                    <hr className="smaller" />
                    <ResponsiveCenterDiv>
                        <h1 className="mxr-med-gold" style={{ marginTop: "15px" }}>Your Recently Mixd</h1>
                    </ResponsiveCenterDiv>
                    <ResponsiveCenterDiv className={"mt-4"}>
                        {personalRecentDrinks && (
                            personalRecentDrinks.length > 0 ?
                                <DrinkCollection drinks={personalRecentDrinks} />
                                :
                                <div className="w-100 d-flex justify-content-center">
                                    <h3 className="mxr-light-gold">You haven't mixd any drinks!</h3>
                                </div>
                        )}
                    </ResponsiveCenterDiv>
                </>}
        </div>
    );
}

export default Home;