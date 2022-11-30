import React from "react";
import { NavButtonLink2 } from "../components/Navbar/NavbarElements";
import './Message.css'

const UnauthAccess = () => {
    return (
        <div className="WelcomePage">
            <div className="welcome">
                <h2>Please login to access this page</h2>
                <NavButtonLink2 to ='/LoginForm'>Login</NavButtonLink2>
            </div>
        </div>
    );
}
export default UnauthAccess;