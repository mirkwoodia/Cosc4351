import React from 'react';
import { Nav, NavLink, NavMenu, Title, Bars, NavButton, NavButtonLink } from "./NavbarElements";
import { useAuth } from "../../AuthProvider";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import fe from "react-datepicker";

const Button = styled.button `
  border-radius: 4px;
  background: white;
  padding: 10px 15px;
  color: orange;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-left: 24px;
  font-weight: bold;
  font-size: 16px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #808080;
    color: white;
  }
`;

const Navbar = () => {
    const { setAuth, auth } = useAuth();
    const navigate = useNavigate();

    const logout = async () => {
        setAuth(false);
        navigate('/Welcome');
    }
    return (
        <>
            <Nav>
                <Title>
                    AI Restaurant
                </Title>
                <Bars />
                <NavMenu>
                    <NavLink to ='/home' activeStyle>
                        Home
                    </NavLink>
                    {auth ? (
                        <NavLink to ='/ProfileManagement' activeStyle>
                            Profile Management
                        </NavLink>) : (
                            <NavLink to ='/UnauthAccess' activeStyle>
                                Profile Management
                            </NavLink>)}
                    {auth ? (
                        <NavLink to ='/Profile' activeStyle>
                            Profile
                        </NavLink>) : (
                        <NavLink to ='/UnauthAccess' activeStyle>
                            Profile
                        </NavLink>)}
                    {auth ? ("") : (
                        <NavLink to = '/register' activeStyle>
                            Create an account
                        </NavLink>)}

                    <NavLink to = '/reservation' activeStyle>
                        Reserve a Table
                    </NavLink>
                </NavMenu>
                <NavButton>
                    {(auth) ? (<Button onClick={logout}>Logout</Button>) : (<NavButtonLink to = '/LoginForm'>Login</NavButtonLink>)}
                </NavButton>
            </Nav>
        </>
    )
}

export default Navbar;