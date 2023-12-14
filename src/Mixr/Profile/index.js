import { Routes, Route, useParams } from "react-router";
import { FaCircleUser } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import './index.css'
import DrinkerProfile from "./DrinkerProfile";
import MixologistProfile from "./MixologistProfile";
import * as usersClient from "../Users/usersClient";
import * as followsClient from "../Clients/followsClient";
import { setCurrentUser } from "../Users/reducer";

function Profile() {
    const { currentUser } = useSelector((state) => state.userReducer);
    const { userID } = useParams(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // signout
    const signout = async () => {
        const status = await usersClient.signout();
        dispatch(setCurrentUser(null));
        navigate("/Home");
    };

    // the user of the profile we're looking at
    const [profile, setProfile] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);

    // get the user of the profile we're looking at
    const fetchProfile = async () => {
        const profile = await usersClient.findUserById(userID);
        setProfile(profile);
        console.log(profile._id);
        console.log(userID);
    }

    const followProfile = async () => {
        const follow = await followsClient.userFollowsUser(profile._id);
        setIsFollowing(true);
    }

    const unfollowProfile = async () => {
        const follow = await followsClient.userUnfollowsUser(profile._id);
        setIsFollowing(false);
    }

    const fetchIsFollowing = async () => {
        const follows = await followsClient.findFollowersOfUser(userID);
        const followers = await Promise.all(follows.map((follow) => follow.follower));
        console.log(followers);
        console.log(currentUser);
        if (currentUser) {
            const currentIsFollowing = followers.find((follower) => follower._id === currentUser._id);
            console.log(currentIsFollowing);
            if (currentIsFollowing) {
                setIsFollowing(true);
            } else {
                setIsFollowing(false);
            }
        } else {
            setIsFollowing(false);
        }
    }



    useEffect(() => {
        fetchProfile();
        fetchIsFollowing();
    }, [userID, isFollowing]);

    return (
        <div className="mxr-container mxr-light-blue-bg padding-top-80">
            {profile && (
                <div className="d-flex flex-wrap justify-content-center profile-pic-container pt-5">
                    <FaCircleUser className="mxr-med-gold profile-pic" />
                    <div className="d-inline-block ms-5">
                        <h1 className="mxr-med-gold mt-3 pt-1">{profile.firstName} {profile.lastName}</h1>
                        <h5 className="mxr-med-gold">{profile.role}</h5>
                        {currentUser && currentUser._id === userID && (
                            <div>
                                <p className="mxr-med-gold">{profile.email}</p>
                                <div className="d-inline-flex flex-wrap mt-1">
                                    <Link to={`/EditProfile`}>
                                        <button className="golden-button-med-outline me-3">Edit Profile</button>
                                    </Link>
                                    <button onClick={signout} className="golden-button-med-outline">Logout</button>
                                </div>
                            </div>)}

                        {currentUser && currentUser._id !== userID &&
                            (isFollowing ? <button onClick={unfollowProfile} className="golden-button-medium mt-3">Unfollow</button> :
                                <button onClick={followProfile} className="golden-button-med-outline mt-3">Follow</button>)
                        }
                    </div>
                </div>)}

            <div className="mb-5">
                <hr className="smaller" />
                <hr />
                <hr className="smaller" />
            </div>
            {profile && profile.role === "DRINKER" && (<DrinkerProfile profile={profile} />)}
            {profile && profile.role === "MIXOLOGIST" && (<MixologistProfile profile={profile} />)}
        </div>
    )
}

export default Profile;