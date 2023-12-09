import { Link, useLocation, useParams } from "react-router-dom";
import db from "../../Database"

function ProfileEditor() {
    const { userID } = useParams();
    const users = db.users;
    const currentUser = users.find((user) => user.userID == userID)

    return (
        <div>
            <div className="mxr-container mt-5">
                <h1 className="mxr-med-gold">Edit Profile</h1>
            </div>

            <div className="mxr-container-smaller mt-5">
                <div className="row">
                    <div className="col-3">
                        <h4 className="mxr-med-gold">Name:</h4>
                    </div>
                    <div className="col-9">
                        <input type="text" className="form-control w-100" placeholder={currentUser.name} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-3">
                        <h4 className="mxr-med-gold">Username:</h4>
                    </div>
                    <div className="col-9">
                        <input type="text" className="form-control w-100" />
                    </div>
                </div>

                <div className="row">
                    <div className="col-3">
                        <h4 className="mxr-med-gold">Password:</h4>
                    </div>
                    <div className="col-9">
                        <input type="text" className="form-control w-100" />
                    </div>
                </div>

                <div className="row">
                    <div className="col-3">
                        <h4 className="mxr-med-gold">Account Type:</h4>
                    </div>
                    <div className="col-9">
                        <select class="form-select w-100">
                            <option selected>{currentUser.profileType}</option>
                            <option value="Drinker">Drinker</option>
                            <option value="Mixologist">Mixologist</option>
                        </select>

                    </div>
                </div>

                <div className="float-end">
                    <button className="golden-button-small-outline me-2">Cancel</button>
                    <button className="golden-button-small">Save</button>
                </div>
            </div>
        </div>
    )
}

export default ProfileEditor;