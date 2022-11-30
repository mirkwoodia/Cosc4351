import React from "react";
import './App.css';
import NavLayout from "./components/Navbar/NavLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home"
import RegisterForm from "./pages/register";
import LoginForm from "./pages/LoginForm";
import ProfileManagement from "./pages/ProfileManagement"
import Welcome from "./pages/Welcome";
import AccountCreated from "./pages/SuccessfulAccount";
import ProfileUpdatedSuccessfully from "./pages/ProfileUpdatedSuccessfully";
import Profile from "./pages/profile.js"
import UnauthAccess from "./pages/UnauthAccess";

function App() {
    return (
        <Router>
        <Routes>
            <Route path = '/Welcome' element={<Welcome />}/>
            <Route path = '/AccountCreated' element={<AccountCreated />}/>
            <Route path = '/ProfileUpdatedSuccessfully' element={<ProfileUpdatedSuccessfully />}/>
            <Route path = '/UnauthAccess' element={<UnauthAccess />}/>
            <Route element = {<NavLayout />}>
                <Route path = '/' exact element={<Home />}/>
                <Route path = '/home' element={<Home />}/>
                <Route path = '/ProfileManagement' element={<ProfileManagement />}/>
                <Route path = '/Profile' element={<Profile />}/>
                <Route path = '/register' element={<RegisterForm />}/>
                <Route path = '/LoginForm' element={<LoginForm />}/>
            </Route>
        </Routes>
        </Router>
    )
}

export default App;