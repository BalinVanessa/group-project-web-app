import { FaMagnifyingGlass, FaRegCircleUser, FaBars } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";

function Navigation() {
    // Get path name to use to make proper navbar icons "active" (will probs make white)
    // I will implement when these screens are created so I can see what the pathnames are - Vanessa
    const { pathname } = useLocation();

    return (
        <div className="sticky-top w-100 d-flex align-items-center mxr-dark-blue-bg pb-2 pt-2">
            <h2 className="mxr-med-gold ms-4 pt-2 pt-md-0 mt-md-2">mixr</h2>
            <div className="ms-auto me-3 me-md-4">
                <Link to="#"><FaMagnifyingGlass className="mxr-med-gold icon-size-lg me-2 me-md-4" /></Link>
                <Link to="#"><FaRegCircleUser className="mxr-med-gold icon-size-lg fa-regular ms-3 me-1" /></Link>
            </div>
        </div>
    )
}

export default Navigation;