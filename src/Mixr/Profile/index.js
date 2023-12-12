import { Routes, Route, useParams } from "react-router";
import { FaCircleUser } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import './index.css'
import db from "../Database"
import DrinkerProfile from "./DrinkerProfile";
import MixologistProfile from "./MixologistProfile";

function Profile() {
    const { userID } = useParams();
    const users = db.users;
    const currentUser = users.find((user) => user._id.$oid === userID);

    return (
        <div className="mxr-container mxr-light-blue-bg padding-top-80">
            <div className="d-flex justify-content-center profile-pic-container pt-5">
                <FaCircleUser className="mxr-med-gold profile-pic" />
                <div className="d-inline-block ms-5">
                    <h1 className="mxr-med-gold mt-3 pt-1">{currentUser.firstName} {currentUser.lastName}</h1>
                    <h5 className="mxr-med-gold">{currentUser.role}</h5>
                    <Link to={`/EditProfile/${userID}`}>
                        <button className="golden-button-med-outline mt-3">Edit Profile</button>
                    </Link>
                </div>
            </div>

            <div className="mb-5">
                <hr className="smaller" />
                <hr />
                <hr className="smaller" />
            </div>
            {currentUser.role === "DRINKER" ? <DrinkerProfile currentUser={currentUser} /> : <MixologistProfile currentUser={currentUser} />}
        </div>
    )
}

export default Profile;