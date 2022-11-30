import React, { useState } from "react";
import '../components/Account/Account.css'
import styled from "styled-components";
import { useNavigate } from "react-router-dom"
import { useAuth } from "../AuthProvider";

const Error = styled.h2 `
  color: red;
  font-size: 12px;
  align-items: center;
  margin-top: -25px;
  margin-bottom: 10px;
`;

function LoginForm({props}) {
    const { setAuth } = useAuth();
    let navigate = useNavigate();

    const [details, setDetails] = useState({
        username: "",
        password: ""
    })

    const [error, setError] = useState("");

    const handleChange = (event) => {
        setDetails({...details, [event.target.name]: event.target.value});
    }

    const handleSubmit = async (event) => {

        event.preventDefault();

        setDetails({
            username: details.username,
            password: details.password
        });

        const value = {details};

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
        };

        const response = await fetch('http://localhost:5000/login', options);
        const result = await response.json();

        if (result.message)
            setError(result.message);
        else {
            setAuth(true);
            navigate('/Welcome');
        }
    }

    return (
        <div className="base-container">
            <div className="header">Login</div>
            <div className="content">
                <form onSubmit={handleSubmit}>
                    <div className="form">
                        <div className="form-group">
                            <label class="special" htmlFor="username">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={setDetails.username}
                                required
                                placeholder={"Username"}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label class="special" htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={setDetails.password}
                                required
                                placeholder={"Password"}
                                onChange={handleChange}
                            />
                        </div>
                        {(error != "") ? (<Error>{error}</Error> ) : ""}
                    </div>
                    <input type="submit" className="special" value="LOGIN"/>
                </form>
            </div>
        </div>

    )
}

export default LoginForm;