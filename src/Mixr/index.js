import Navigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router";
import Profile from "./Profile";
import Login from "./Login";
import SignUp from "./Login/SignUp";
import Home from "./Home";
import ProfileEditor from "./Profile/ProfileEditor";
import Cocktail from "./Cocktail";
import Search from "./Search";
import EditCocktail from "./Cocktail/EditCocktail";

function Mixr() {
    return (
        <div>
            <Navigation />
            <Routes>
                <Route path="Profile/:userID" element={<Profile/>}/>
                <Route path="Login" element={<Login/>}/>
                <Route path="SignUp" element={<SignUp/>}/>
                <Route path="/" element={<Navigate to="/Home"/>} />
                <Route path="/Home" element={<Home />} />
                <Route path="/Home/:userID" element={<Home />} />
                <Route path="/Search/:searchContent" element={<Search />} />
                <Route path="/Profile/:userID" element={<Profile/>}/>
                <Route path="/EditProfile/:userID" element={<ProfileEditor/>}/>
                <Route path="/Cocktail/:id" element={<Cocktail/>}/>
                <Route path="/EditCocktail/:id" element={<EditCocktail/>}/>
            </Routes>
        </div>
    )

}

export default Mixr;