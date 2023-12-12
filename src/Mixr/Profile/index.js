import { Routes, Route, useParams } from "react-router";
import { FaCircleUser } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import './index.css'
import DrinkerProfile from "./DrinkerProfile";
import MixologistProfile from "./MixologistProfile";
import * as usersClient from "../Users/usersClient";

function Profile() {
    const { userID } = useParams();
    // the user of the profile we're looking at
    const [profile, setProfile] = useState(null);

    // get the user of the profile we're looking at
    const fetchProfile = async() => {
        const profile = await usersClient.findUserById(userID);
        setProfile(profile);
    }

    useEffect(() => {
        fetchProfile();
    }, [userID]);

    return (
        <div className="mxr-container mxr-light-blue-bg padding-top-80">
            {profile && (
            <div className="d-flex justify-content-center profile-pic-container pt-5">
                <FaCircleUser className="mxr-med-gold profile-pic" />
                <div className="d-inline-block ms-5">
                    <h1 className="mxr-med-gold mt-3 pt-1">{profile.firstName} {profile.lastName}</h1>
                    <h5 className="mxr-med-gold">{profile.role}</h5>
                    <Link to={`/EditProfile/${userID}`}>
                        <button className="golden-button-med-outline mt-3">Edit Profile</button>
                    </Link>
                </div>
            </div>)}

            <div className="mb-5">
                <hr className="smaller" />
                <hr />
                <hr className="smaller" />
            </div>
            {profile && profile.role === "DRINKER" ? <DrinkerProfile currentUser={profile} /> : <MixologistProfile currentUser={profile} />}
        </div>
    )
}

export default Profile;