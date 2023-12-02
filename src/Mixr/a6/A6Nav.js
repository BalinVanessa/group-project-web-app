import { Link, useLocation } from "react-router-dom";
function A6Nav() {
    const { pathname } = useLocation();
    return (
        <nav className="nav nav-tabs mt-2">
            <Link to="/signupa6" className={`nav-link ${pathname.includes("signup") && "active"}`}>Sign up</Link>
            <Link to="/signin" className={`nav-link ${pathname.includes("signin") && "active"}`}>Sign in</Link>
            <Link to="/admin/users" className={`nav-link ${pathname.includes("admin/users") && "active"}`}>User table</Link>
            <Link to="/account" className={`nav-link ${pathname.includes("account") && "active"}`}>Account</Link>
        </nav>
    );
}
export default A6Nav;