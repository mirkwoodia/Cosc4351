import React from "react";
import { NavButtonLink2 } from "../components/Navbar/NavbarElements";
import './SuccessfulAccout.css'

const AccountCreated = () => {
    return (
        <div className="AccountCreatedPage">
            <div className="welcome">
                <h2> You successfully created an account! Continue to login.</h2>
                <NavButtonLink2 to ='/LoginForm'>Continue</NavButtonLink2>
            </div>
        </div>
    );
}
export default AccountCreated;