import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
function Account() {
    const { id } = useParams();
    const [account, setAccount] = useState(null);
    const navigate = useNavigate();
    const findUserById = async (id) => {
        const user = await client.findUserById(id);
        setAccount(user);
    };
    const fetchAccount = async () => {
        const account = await client.account();
        setAccount(account);
    };
    const save = async () => {
        await client.updateUser(account);
    };
    const signout = async () => {
        await client.signout();
        navigate("/signin");
    };
    useEffect(() => {
        if (id) {
            findUserById(id);
        } else {
            fetchAccount();
        }
    }, []);
    return (
        <div className="w-50">
            <h1 className="mxr-med-gold">Account</h1>
            {account && (
                <div>
                    <label>
                        <h3 className="mxr-med-gold">Password</h3>
                        <input value={account.password}
                            onChange={(e) => setAccount({
                                ...account,
                                password: e.target.value
                            })} /></label>
                    <label>
                        <h3 className="mxr-med-gold">First name</h3>
                        <input value={account.firstName}
                            onChange={(e) => setAccount({
                                ...account,
                                firstName: e.target.value
                            })} /></label>
                    <label>
                        <h3 className="mxr-med-gold">Last name</h3>
                        <input value={account.lastName}
                            onChange={(e) => setAccount({
                                ...account,
                                lastName: e.target.value
                            })} /></label>
                    <label>
                        <h3 className="mxr-med-gold">Date of birth</h3>
                        <input value={account.dob}
                            onChange={(e) => setAccount({
                                ...account,
                                dob: e.target.value
                            })} /></label>
                    <label>
                        <h3 className="mxr-med-gold">Email</h3>
                        <input value={account.email}
                            onChange={(e) => setAccount({
                                ...account,
                                email: e.target.value
                            })} /></label>
                    <label>
                        <h3 className="mxr-med-gold">Role</h3>
                        <select
                            value={account.role}
                            onChange={(e) => setAccount({
                                ...account,
                                role: e.target.value
                            })}>
                            <option value="USER">User</option>
                            <option value="ADMIN">Admin</option>
                            <option value="MIXOLOGIST">Mixologist</option>
                            <option value="DRINKER">Drinker</option>
                        </select></label>
                    <button onClick={save}>
                        Save
                    </button>
                    <button onClick={signout}>
                        Signout
                    </button>
                    <Link to="/admin/users" className="btn btn-warning w-100">
                        Users
                    </Link>
                </div>
            )}
        </div>
    );
}
export default Account;

