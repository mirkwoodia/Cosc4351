import React, { useEffect,useState } from "react";
import './ProfileManagement.css';
import { useNavigate } from "react-router-dom"

function Profile({props}) {
	let navigate = useNavigate();
    const [Loading,setLoading] = useState(false)
    const [backendDetails, setBackendDetails] = useState({
        id: 0,
        username: "",
        password: ""
    })

    const [details, setDetails] = useState({
        username: "",
        fullname: "",
        address1: "",
        address2: "",
        city: "",
        zipcode: "",
        state: ""
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
        })
    },[]);

    useEffect(() =>{
        if(Loading && backendDetails === undefined){
            alert("Please Login");
            navigate('/LoginForm');
        }
        else if(Loading && backendDetails !== undefined){
           // console.log(backendDetails)
        }
    },[backendDetails])

    const [backendData, setBackendData] = useState([])
    const value = {backendDetails}
    useEffect(() => {
        fetch('http://localhost:5000/pm_info',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
        })
        .then(res => {
            let result = res.json()
            return result;
        })
        .then( data => {
            //console.log(data)
            //alert(data.result)
            setDetails(data.result)
            
        })
    },[details]);
    //alert(details.city)
    return(
        <div classname="EditProfile">
            <h1>Profile</h1>
            <div class="body">
                <form>
                    <label>
                        <div class="input">                            
                            Full Name:
                            <input type="text"
                                   value={details.fullname}
                                   placeholder=""
																	 disable
                            /><br></br>
                        </div>
                        <div class="input">
                            Address 1:
                            <input type="text"
                                   value={details.address1}
																	 disable
                            /><br></br>
                        </div>
						<div class="input">
                            Address 2:
                            <input type="text"
                                   value={details.address2}
																	 disable
                            /><br></br>
                        </div>
						<div class="input">
                            City:
                            <input type="text"
                                   value={details.city}
																	 disable
                            /><br></br>
                        </div>
                        <div class="input">
                            Five digit zip code:
                            <input type="text"
                                   value={details.zipcode}
																	 disable
                            /><br></br>
                        </div>
												<div class="input">
                        State
                        <input type="text" value={details.state} disable/><br></br>
                        </div>
                    </label>      
                     
                </form>
            </div>
        </div>
    );
}

export default Profile;