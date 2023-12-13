import { FaMagnifyingGlass, FaRegCircleUser, FaBars } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Navigation() {
    // Get path name to use to make proper navbar icons "active" (will probs make white)
    // I will implement when these screens are created so I can see what the pathnames are - Vanessa
    const { pathname } = useLocation();
    const { currentUser } = useSelector((state) => state.userReducer);

    // determines what the profile icon leads to based on if the user is logged in or not.
    const getProfileLink = () => {
        if (currentUser) {
            return `/Profile/${currentUser._id}`;
        } else {
            return "/Login";
        }
    }

    const getActiveProfileColor = () => {
        if (pathname.includes("/Profile/")) {
            return "mxr-light-gold";
        } else {
            return "mxr-med-gold";
        }
    }

    const getActiveSearchColor = () => {
        if (pathname.includes("/Search")) {
            return "mxr-light-gold";
        } else {
            return "mxr-med-gold";
        }
    }

    return (
        <div className="sticky-top w-100 d-flex align-items-center mxr-dark-blue-bg pb-2 pt-2">
            <Link to="/Home" className="no-underline">
                <h2 className="mxr-med-gold ms-4 pt-2 pt-md-0 mt-md-2">mixr</h2>
            </Link>

            <div className="ms-auto me-3 me-md-4">
                <Link to="/Search"><FaMagnifyingGlass className={getActiveSearchColor() + " icon-size-lg me-2 me-md-4"} /></Link>
                <Link to={getProfileLink()}><FaRegCircleUser className={getActiveProfileColor() + " icon-size-lg fa-regular ms-3 me-1"} /></Link>
            </div>
        </div>
    )
}

export default Navigation;