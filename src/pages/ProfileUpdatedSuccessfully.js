import React from "react";
import './ProfileManagement.css';
import {NavButtonLink2} from "../components/Navbar/NavbarElements";

const ProfUpdateSuccess = () => {
    return (
        <div className="WelcomePage">
            <div className="welcome">
                <h2>You successfully updated your profile!</h2>
                <NavButtonLink2 to ='/home'>Continue</NavButtonLink2>
            </div>
        </div>
    );
}
export default ProfUpdateSuccess;