import Navigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router";
import Profile from "./Profile";
import Login from "./Login";
import SignUp from "./Login/SignUp";

function Mixr() {
    // Put Your Screens in Routes, will go under nav bar
    return (
        <div>
            <Navigation />
            <Routes>
                <Route path="Profile/:userID" element={<Profile/>}/>
                <Route path="Login" element={<Login/>}/>
                <Route path="SignUp" element={<SignUp/>}/>
            </Routes>
        </div>
    )

}

export default Mixr;