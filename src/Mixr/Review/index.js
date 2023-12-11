import { Link, useParams } from "react-router-dom";
import db from "../Database"

function Review() {
    return (
        <div>
            <div className="mxr-container mt-5">
                <h1 className="mxr-med-gold">Edit Review</h1>
            </div>

            <div className="mxr-container-smaller mt-5">
                <div className="row">
                    <div className="col-3">
                        <h4 className="mxr-med-gold">Your Review</h4>
                    </div>
                    <div className="col-9">
                        <input type="text" className="form-control w-100" placeholder="This was a great drink!" />
                    </div>
                </div>
                <br></br>

                <div className="float-end">
                    <Link to={`/Review`}>
                        <button className="golden-button-small-outline me-2">Cancel</button>
                    </Link>
                    <Link to={`/Review`}>
                        <button className="golden-button-small">Save</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Review;