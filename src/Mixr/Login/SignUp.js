import { GiMartini } from "react-icons/gi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as userClient from "../Users/usersClient";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../Users/reducer";

//have to align text labels
function SignUp() {
    return (
        <div>
            <div className="mxr-light-blue-bg p-5">
                <div className="text-center  mt-5">
                    <GiMartini className="mxr-med-gold icon-size-xlg" />
                    <h1 className="mxr-med-gold">mixr</h1>
                </div>
                <br></br>
                <div className="login-inputs text-center">
                    <form id="username">
                        <label for="username" className="mxr-med-gold"><h5>Username</h5></label>
                        <br></br>
                        <input className="signup-fields" type="text"></input>
                    </form>
                    <br></br>
                    <form id="password">
                        <label for="password" className="mxr-med-gold"><h5>Password</h5></label>
                        <br></br>
                        <input className="signup-fields" type="text"></input>
                    </form>
                    <br></br>
                    <form id="first-name">
                        <label for="first-name" className="mxr-med-gold"><h5>First Name</h5></label>
                        <br></br>
                        <input className="signup-fields" type="text"></input>
                    </form>
                    <br></br>
                    <form id="last-name">
                        <label for="last-name" className="mxr-med-gold"><h5>Last Name</h5></label>
                        <br></br>
                        <input className="signup-fields" type="text"></input>
                    </form>
                    <br></br>
                    <form id="email">
                        <label for="email" className="mxr-med-gold"><h5>Email</h5></label>
                        <br></br>
                        <input className="signup-fields" type="text"></input>
                    </form>
                    <br></br>
                    <form id="dob">
                        <label for="dob" className="mxr-med-gold"><h5>Date of Birth</h5></label>
                        <br></br>
                        <input className="signup-fields" type="date"></input>
                    </form>

                    <div className="spacer-m"></div>

                    <Link to="#">
                        <button className="golden-button-small">Sign Up</button>
                    </Link>

                    <div className="spacer-xl"></div>

                    <Link to={`/Login`}>
                        <button className="golden-button-large-outline">Log in to an existing account</button>
                    </Link>
                    <div className="spacer-xxl"></div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;