import { GiMartini } from "react-icons/gi";
import * as userClient from "../Users/usersClient";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../Users/reducer";
import { Link, useNavigate } from "react-router-dom";

//have to align text labels
function Login() {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signIn = async () => {
        try {
            const user = await userClient.signin(credentials);
            dispatch(setCurrentUser(user));
            navigate(`/Profile/${user._id}`);
        } catch (error) {
            setError(error);
        }
    };


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
                        <input
                            className="signup-fields"
                            type="text"
                            value={credentials.username}
                            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} />
                    </form>
                    <br></br>
                    <form id="password">
                        <label for="password" className="mxr-med-gold"><h5>Password</h5></label>
                        <br></br>
                        <input
                            className="signup-fields"
                            type="password"
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
                    </form>

                    <div className="spacer-m"></div>

                    <Link to="#">
                        <button className="golden-button-small" onClick={signIn}>Log in</button>
                    </Link>

                    <div className="spacer-xl"></div>

                    <Link to={`/Register`}>
                        <button className="golden-button-large-outline">Create an account instead</button>
                    </Link>
                    <div className="spacer-xxl"></div>
                </div>
            </div>
        </div>
    )
}

export default Login;