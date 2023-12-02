import * as client from "./client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Signin() {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const navigate = useNavigate();
    const signin = async () => {
        await client.signin(credentials);
        navigate(`/account`);
    };
    return (
        <div>
            <h1 className="mxr-med-gold">Signin</h1>
            <label>
                <h3 className="mxr-med-gold">Username</h3>
                <input value={credentials.username} onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} />
            </label>
            <label>
                <h3 className="mxr-med-gold">Password</h3>
                <input value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} /></label>
            <button onClick={signin}> Signin </button>
        </div>
    );
}
export default Signin;