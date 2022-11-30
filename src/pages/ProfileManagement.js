import React, { useMemo, useEffect ,useState } from "react";
import './ProfileManagement.css';
import { useNavigate } from "react-router-dom"
import { DropDownList } from "@progress/kendo-react-dropdowns"; 

function ProfileManagement({props}) {
    let navigate = useNavigate();

    const [details, setDetails] = useState({
        FullName: "",
        Address1: "",
        Address2: "",
        City: "",
        ZipCode: "",
        State: "",
    })

    const [selectedState, setSelectedState] = useState(null);

    const handleChange = (event) => {
        setDetails({...details, [event.target.name]: event.target.value});
    }

    const newHandle = () => {
        setDetails({
            FullName: details.FullName,
            Address1: details.Address1,
            Address2: details.Address2,
            City: details.City,
            ZipCode: details.ZipCode,
            State: selectedState,
        });
    }
    const handleSubmit = async (event) => {
        setDetails(props)
        console.log(details)
        event.preventDefault()
        setDetails({
            FullName: details.FullName,
            Address1: details.Address1,
            Address2: details.Address2,
            City: details.City,
            ZipCode: details.ZipCode,
            State: selectedState,
        });

       const value = {details};
    
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
        };
        const response = await fetch("http://localhost:5000/ProfileManagement",options);
        const b = await response.json();
        console.log(b);
        navigate('/ProfileUpdatedSuccessfully')
    }

    const [states, setStates] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/states',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
        })
        .then(res => {
            let result = res.json()
            return result;
        })
        .then( data => {
            //console.log(data)
            //alert(data.result)
            setStates(data.result.state)
            //alert(data.result.state)
        })
    },[states]);

    return(
        <div classname="EditProfile">
            <h1>Edit profile</h1>
            <div class="body">
                <form onClick={newHandle} onSubmit={handleSubmit}>
                    <label>
                        <div class="input">                            
                            Full Name:
                            <input type="text"
                                   name="FullName"
                                   value={setDetails.FullName}
                                   placeholder={details.FullName}
                                   maxLength = "50"
                                   required
                                   onChange={handleChange}
                            /><br></br>
                        </div>
                        <div class="input">
                            Address 1:
                            <input type="text"
                                   name="Address1"
                                   value={setDetails.Address1}
                                   placeholder={details.Address1}
                                   maxLength = "100"
                                   required
                                   onChange={handleChange}
                            /><br></br>
                        </div>
						<div class="input">
                            Address 2:
                            <input type="text"
                                   name="Address2"
                                   value={setDetails.Address2}
                                   placeholder={details.Address2}
                                   maxLength = "100"
                                   onChange={handleChange}
                            /><br></br>
                        </div>
						<div class="input">
                            City:
                            <input type="text"
                                   name="City"
                                   value={setDetails.City}
                                   placeholder={details.City}
                                   maxLength = "100"
                                   required
                                   onChange={handleChange}
                            /><br></br>
                        </div>
                        <div class="input">
                            Five digit zip code:
                            <input type="text"
                                   name="ZipCode"
                                   value={setDetails.ZipCode}
                                   placeholder={details.ZipCode}
                                   pattern="[0-9]{5,}"
                                   required
                                   onChange={handleChange}
                            /><br></br>
                        </div>
						<div class="input">
                        Select State
                            <select class="box" name="State" value={selectedState}
                            onChange={(state) => setSelectedState(state.target.value)} required>
                            <option value = "none" selected disabled hidden>State</option>
                            <option value = "TX">TX</option>
                            <option value = "AL">AL</option>
                            <option value = "TN">TN</option>
                            <option value = "AK">AK</option>
                            <option value = "NY">NY</option>
                            <option value = "CA">CA</option>
                            <option value = "NV">NV</option>
                            <option value = "WM">WM</option>
                            <option value = "OH">OH</option>
                            <option value = "OK">OK</option>
                            </select>
                        </div>
                        <div>
                            <br></br>
                        <input type="submit" value="Save"/> 
                        </div>
                    </label>      
                     
                </form>
            </div>
        </div>
    );
}

export default ProfileManagement;