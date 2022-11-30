import React from "react";
import { NavButtonLink2 } from "../components/Navbar/NavbarElements";
import { useAuth } from "../AuthProvider";
import './Message.css'

const Welcome = () => {
    const { auth } = useAuth();
    return (
        <div className="WelcomePage">
            <div className="welcome">
                {auth ? (<h2>Successfully logged in!</h2>) : (<h2>Successfully logged out!</h2>)}
                <NavButtonLink2 to ='/home'>Continue</NavButtonLink2>
            </div>
        </div>
    );
}
export default Welcome;
