import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as usersClient from "../../Users/usersClient";
import { setCurrentUser } from "../../Users/reducer";

function ProfileEditor() {
    const { currentUser } = useSelector((state) => state.userReducer);
    const [account, setAccount] = useState(currentUser);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const setPageAccess = async () => {
        if (!currentUser) {
            navigate("/Login");
        }
    }

    const deleteUser = async () => {
        const status = await usersClient.deleteUser(account);
        dispatch(setCurrentUser(null));
        navigate("/Home");
    }

    const updateUser = async () => {
        const user = await usersClient.updateUser(account);
        dispatch(setCurrentUser(user));
        console.log(user);
        navigate(`/Profile/${user._id}`);
    }

    useEffect(() => {
        setPageAccess();
    }, []);

    return (
        <div>
            <div className="mxr-light-blue-bg p-5">
                <div className="text-center mt-5">
                    <h1 className="mxr-med-gold">Edit Profile</h1>
                </div>

                <div className="login-inputs text-center mt-5">
                    <form>
                        <label for="username" className="mxr-med-gold"><h5>Username</h5></label>
                        <br></br>
                        <input
                            className="signup-fields"
                            type="text"
                            id="username"
                            value={account.username}
                            onChange={(e) => setAccount({ ...account, username: e.target.value })}></input>
                    </form>

                    <form className="mt-5">
                        <label for="password" className="mxr-med-gold"><h5>Password</h5></label>
                        <br></br>
                        <input
                            className="signup-fields"
                            type="password"
                            id="password"
                            value={account.password}
                            onChange={(e) => setAccount({ ...account, password: e.target.value })}></input>
                    </form>


                    <form className="mt-5">
                        <label for="first-name" className="mxr-med-gold"><h5>First Name</h5></label>
                        <br></br>
                        <input
                            className="signup-fields"
                            type="text"
                            id="first-name"
                            value={account.firstName}
                            onChange={(e) => setAccount({ ...account, firstName: e.target.value })}></input>
                    </form>


                    <form className="mt-5">
                        <label for="last-name" className="mxr-med-gold"><h5>Last Name</h5></label>
                        <br></br>
                        <input
                            className="signup-fields"
                            type="text"
                            id="last-name"
                            value={account.lastName}
                            onChange={(e) => setAccount({ ...account, lastName: e.target.value })}></input>
                    </form>


                    <form className="mt-5">
                        <label for="email" className="mxr-med-gold"><h5>Email</h5></label>
                        <br></br>
                        <input
                            className="signup-fields"
                            type="text"
                            id="email"
                            value={account.email}
                            onChange={(e) => setAccount({ ...account, email: e.target.value })}></input>
                    </form>


                    <form className="mt-5">
                        <label for="dob" className="mxr-med-gold"><h5>Date of Birth</h5></label>
                        <br></br>
                        <input
                            className="signup-fields"
                            id="dob"
                            type="date"
                            value={account.dob}
                            onChange={(e) => setAccount({ ...account, dob: e.target.value })}></input>
                    </form>

                    <form id="role" className="mt-5">
                        <label for="role" className="mxr-med-gold">
                            <h5>Role</h5>
                        </label>
                        <br />
                        <div className="d-inline">
                            <input
                                className="form-check-input me-2"
                                type="radio"
                                name="roleButtons"
                                id="drinkerRadio"
                                value="DRINKER"
                                onChange={(e) => setAccount({ ...account, role: e.target.value })}
                                checked />
                            <label
                                for="drinkerRadio"
                                className="mxr-med-gold me-4">Drinker</label>
                            <input
                                className="form-check-input me-2"
                                type="radio"
                                name="roleButtons"
                                id="mixologistRadio"
                                value="MIXOLOGIST"
                                onChange={(e) => setAccount({ ...account, role: e.target.value })} />
                            <label
                                for="mixologistRadio"
                                className="mxr-med-gold">Mixologist</label>
                        </div>
                    </form>

                    <div className="spacer-m"></div>

                    <button onClick={deleteUser} className="golden-button-med-outline m-3">Delete Account</button>

                    <button onClick={updateUser} className="golden-button-medium m-3">Update Account</button>


                    <div className="spacer-xl"></div>

                    <div className="spacer-xxl"></div>
                </div>
            </div>
        </div>
    )
}

export default ProfileEditor;