import React, { useState, useEffect } from "react";
import '../components/Account/Account.css'
import styled from "styled-components";
import { useNavigate } from "react-router-dom"
import $ from "jquery"

const Error = styled.h2 `
  color: red;
  font-size: 12px;
  align-items: center;
  margin-top: -25px;
  margin-bottom: 10px;
`;

function ReservationForm({props}){
    let navigate = useNavigate();


    const [Loading,setLoading] = useState(false)
    const [backendDetails, setBackendDetails] = useState({
        id: 0,
        username: "",
        password: ""
    })

    const [details2, setDetails2] = useState({
        username: "",
        fullname: ""
    })

    useEffect(() => {
        setLoading(false)
        fetch('http://localhost:5000/login_info')
        .then(res => {
            return res.json();
        })
        .then( data => {
            setBackendDetails(data.currentlyLoggedIn.at(0))
            setLoading(true);
            //console.log(data.currentlyLoggedIn.at(0));
        })
    },[]);

    

    useEffect(() =>{
        if(Loading && backendDetails === undefined){
            setBackendDetails({id: 0, username: 'guest', password: ''})
            alert("You can register as well under the create user tab!")
        }
        else if(Loading && backendDetails !== undefined){
           // console.log(backendDetails)
        }
    },[backendDetails])
    


    const [details, setDetails] = useState({
        username: "",
        phone: "",
        email: "",
        date: "",
        start: "",
        guests: ""
    })
    
    const [error, setError] = useState("");

    const handleChange = (event) => {
        setDetails({...details, [event.target.name]: event.target.value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setDetails({
            username: details.username,
            phone: details.phone,
            email: details.email,
            date: details.date,
            start: details.start,
            guests: details.guests
        });

        const value = {details};

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
        };

        const response = await fetch('http://localhost:5000/reservation', options);
        const result = await response.json();
        if (result.id > 3) {
            alert ("High traffic day, you will need your credit card to reserve.");
            //console.log(result);
            
        }
        else {
            // Add in alert to say successful reservation, and if res.Id > 3, then also say cc needed
            console.log(result)
            var alertMessage = "Successfully booked an appointment";
            //alertMessage += ;
            alert(alertMessage);
            //navigate('/home');
        }
    }

    /*
    const pageLoad = async () => {
        setDetails({
            username: details.username,
            start: details.start
        });

        const value = {details};

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
        };

        const response = await fetch('http://localhost:5000/reservationID', options);
        await response.json()
        .then (async (result) => {
            let result2 = JSON.parse(result);
            console.log(result2);
        })
        
        let result2 = await JSON.parse(result);
        if (result2)
            console.log(result2)
        else {
            // Add in alert to say successful reservation, and if res.Id > 3, then also say cc needed
            console.log(result2)
            //navigate('/home');
        }
    }
    pageLoad();
    */
    
    return (
        <div className="base-container">
            <div className="header">Reserve a Table</div>
            <div className="content">
                <form onSubmit={handleSubmit}>
                <div className="form">
                    <div className="form-group">
                        <label class="special" htmlFor="username">Name</label>
                        <input
                            type="text"
                            name="username"
                            value={setDetails.username}
                            required
                            placeholder={"name"}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label class="special" htmlFor="phone">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={setDetails.phone}
                            required
                            placeholder={"Phone Number"}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label class="special" htmlFor="email">Email</label>
                        <input
                            type="text"
                            name="email"
                            value={setDetails.email}
                            required
                            placeholder={"Email"}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label class="special" htmlFor="date">Date</label>
                        <input
                            type="text"
                            name="date"
                            value={setDetails.date}
                            required
                            placeholder={"Date"}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label class="special" htmlFor="start">Start</label>
                        <input
                            type="text"
                            name="start"
                            value={setDetails.start}
                            required
                            placeholder={"Start Time"}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label class="special" htmlFor="guests"># of Guests</label>
                        <input
                            type="text"
                            name="guests"
                            value={setDetails.guests}
                            required
                            placeholder={"# of Guests"}
                            onChange={handleChange}
                        />
                    </div>
                    {(error != "") ? (<Error>{error}</Error> ) : ""}
                </div>
                <input type="submit" className="special" value="RESERVE"/>
                </form>
            </div>
        </div>
    )
}
export default ReservationForm;