import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
function Signup() {
    const [error, setError] = useState("");
    const [credentials, setCredentials] = useState({
        username: "", password: ""
    });
    const navigate = useNavigate();
    const signup = async () => {
        try {
            await client.signup(credentials);
            navigate("/account");
        } catch (err) {
            setError(err.response.data.message);
        }
    };
    return (
        <div>
            <h1 className="mxr-med-gold">Signup</h1>
            {error && <div>{error}</div>}
            <label>
                <h3 className="mxr-med-gold">Username</h3>
                <input
                    value={credentials.username}
                    onChange={(e) => setCredentials({
                        ...credentials,
                        username: e.target.value
                    })} /></label>
            <label>
                <h3 className="mxr-med-gold">Password</h3>
                <input
                    value={credentials.password}
                    onChange={(e) => setCredentials({
                        ...credentials,
                        password: e.target.value
                    })} /></label>
            <button onClick={signup}>
                Signup
            </button>
        </div>
    );
}
export default Signup;

