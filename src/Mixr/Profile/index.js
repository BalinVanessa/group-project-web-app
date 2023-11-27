import { Routes, Route, useParams } from "react-router";
import { FaCircleUser } from "react-icons/fa6";
import './index.css'
import db from "../Database"
import DrinkerProfile from "./DrinkerProfile";
import MixologistProfile from "./MixologistProfile";

function Profile() {
    const { userID } = useParams();
    const users = db.users;
    const currentUser = users.find((user) => user.userID == userID)

    return (
        <div className="mxr-container mxr-light-blue-bg padding-top-80">
            <div className="d-flex justify-content-center profile-pic-container pt-5">
                <FaCircleUser className="mxr-med-gold profile-pic" />
                <div className="d-inline-block ms-5">
                    <h1 className="mxr-med-gold mt-5 pt-1">{currentUser.name}</h1>
                    <h5 className="mxr-med-gold">{currentUser.profileType}</h5>
                </div>
            </div>

            <hr />

            (if (currentUser.profileType === "Drinker") {
                <DrinkerProfile currentUser={currentUser}/>
            } else if (currentUser.profileType === "Mixologist") {
                <MixologistProfile/>
            })

        </div>
    )
}

export default Profile;