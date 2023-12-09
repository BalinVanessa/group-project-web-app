import db from "../Database";
import { useParams } from "react-router";
import SearchBar from "../Search/SearchBar";
import { GiMartini } from "react-icons/gi";
import './index.css';

function Home() {
    const { userID } = useParams();
    const users = db.users;
    const currentUser = userID && users.find((user) => user.userID == userID);
    const profileType = currentUser && currentUser.profileType;

    return (
        <div className="mxr-container mxr-light-blue-bg padding-top-80">
            <div className="d-flex justify-content-center title-div">
                <div className="d-flex justify-content-center align-items-center flex-column">
                    <GiMartini className="d-block mxr-med-gold martini-icon" />
                    <h1 className="mxr-med-gold d-block logo-text">mixr</h1>
                    <h5 className="mxr-light-gold">Your cocktail recipe hub</h5>
                </div>
            </div>
            <SearchBar/>

        </div>
    );
}

export default Home;