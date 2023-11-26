import Navigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router";
import Profile from "./Profile";

function Mixr() {
    // Put Your Screens in Routes, will go under nav bar
    return (
        <div>
            <Navigation />
            <Routes>
                <Route path="Profile/:userID" element={<Profile/>}/>
            </Routes>
        </div>
    )

}

export default Mixr;