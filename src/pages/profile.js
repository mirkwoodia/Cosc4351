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
        name: "",
        mailing_address: "",
        billing_address: "",
        diner: "",
        points: "",
        payment: ""
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
                                   value={details.name}
                                   placeholder=""
																	 disable
                            /><br></br>
                        </div>
                        <div class="input">
                            Mailing Address:
                            <input type="text"
                                   value={details.mailing_address}
																	 disable
                            /><br></br>
                        </div>
						<div class="input">
                            Billing Address:
                            <input type="text"
                                   value={details.billing_address}
																	 disable
                            /><br></br>
                        </div>
						<div class="input">
                            Preferred Diner:
                            <input type="text"
                                   value={details.diner}
																	 disable
                            /><br></br>
                        </div>
                        <div class="input">
                            Points
                            <input type="text"
                                   value={details.points}
																	 disable
                            /><br></br>
                        </div>
												<div class="input">
                        Payment Method
                        <input type="text" value={details.payment} disable/><br></br>
                        </div>
                    </label>      
                     
                </form>
            </div>
        </div>
    );
}

export default Profile;