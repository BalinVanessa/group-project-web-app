import { FaS, FaStar, FaStarHalf } from "react-icons/fa6";
import { useParams } from "react-router";
import db from "../../Database";

function DrinkerProfile({ currentUser }) {
    // the drink database
    const drinks = db.drinks;
    const users = db.users;

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

    // the user's followers 
    const followers = users.filter((user) => user.following.includes(currentUser.userID))

    // who the user's following
    const following = currentUser.following.map((id) => users.find((user) => user.userID == id))

    // Still need to implement following (might make this own component)
    // Still need to implement reviews (might make this own component)
    return (
        <div>
            <div className="flush-right">
                <h3 className="mxr-med-gold">Your Favorite Recipes</h3>
                <div className="d-inline-flex cardRow mt-4 w-100">
                    {favDrinks.map((drink) => (
                        <div className="drinkCard mxr-med-blue-bg">
                            <img className="drinkCard-img" src={drink.image} />
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

                <h3 className="mxr-med-gold mt-5">Followers</h3>
                <div className="d-inline-flex cardRow mt-4 w-100">
                    {followers.map((follower) => (
                        <div className="profile-card">
                            <img className="circle-img mb-4" src="./Images/thegoat.jpg" />
                            <h5 className="mxr-light-gold">{follower.name}</h5>
                        </div>
                    ))}
                </div>

                <h3 className="mxr-med-gold mt-5">Following</h3>
                <div className="d-inline-flex cardRow mt-4 w-100">
                    {following.map((follow) => (
                        <div className="profile-card">
                            <img className="circle-img mb-4" src="./Images/thegoat.jpg" />
                            <h5 className="mxr-light-gold">{follow.name}</h5>
                        </div>
                    ))}
                </div>
            </div>

            <h3 className="mxr-med-gold mt-5">Reviews</h3>
            <div className="mt-4 w-100">
                <div className="review d-flex">
                    <img className="review-img circle-img me-5" src="./Images/thegoat.jpg" />
                    <div className="review-text">
                        <h4>Espresso Martini</h4>
                        <div className="d-inline">
                            {makeStars(4)}
                        </div>
                        <p className="mt-3">Yummy.</p>
                    </div>
                </div>

                <div className="review d-flex">
                    <img className="review-img circle-img me-5" src="./Images/thegoat.jpg" />
                    <div className="review-text">
                        <h4>Espresso Martini</h4>
                        <div className="d-inline">
                            {makeStars(4)}
                        </div>
                        <p className="mt-3">Yummy.</p>
                    </div>
                </div>

                <div className="review d-flex">
                    <img className="review-img circle-img me-5" src="./Images/thegoat.jpg" />
                    <div className="review-text">
                        <h4>Espresso Martini</h4>
                        <div className="d-inline">
                            {makeStars(4)}
                        </div>
                        <p className="mt-3">Yummy.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DrinkerProfile;