import { Link, useParams } from "react-router-dom";
import db from "../Database"

function EditCocktail() {
    const { id } = useParams(); //grabs drinkID
    const drinks = db.drinks;
    const currentDrink = drinks.find((drink) => drink.id == id)

    return (
        <div>
            <div className="mxr-container mt-5">
                <h1 className="mxr-med-gold">Edit Recipe</h1>
            </div>

            <div className="mxr-container-smaller mt-5">
                <div className="row">
                    <div className="col-3">
                        <h4 className="mxr-med-gold">Cocktail Name:</h4>
                    </div>
                    <div className="col-9">
                        <input type="text" className="form-control w-100" placeholder={currentDrink.name} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-3">
                        <h4 className="mxr-med-gold">Description:</h4>
                    </div>
                    <div className="col-9">
                        <textarea className="form-control w-100" rows="6" placeholder={currentDrink.description} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-3">
                        <h4 className="mxr-med-gold">Ingredients:</h4>
                    </div>
                    <div className="col-9">
                        <input type="text" className="form-control w-100" />
                    </div>
                </div>

                <div className="row">
                    <div className="col-3">
                        <h4 className="mxr-med-gold">Directions:</h4>
                    </div>
                    <div className="col-9">
                        <input type="text" className="form-control w-100" placeholder="Mix the ingredients, shake, pour, enjoy." />
                    </div>
                </div>

                <div className="float-end">
                    <Link to={`/Cocktail/${id}`}>
                        <button className="golden-button-small-outline me-2">Cancel</button>
                    </Link>
                    <Link to={`/Cocktail/${id}`}>
                        <button className="golden-button-small">Save</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default EditCocktail;