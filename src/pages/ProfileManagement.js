import React, { useMemo, useEffect ,useState } from "react";
import './ProfileManagement.css';
import { useNavigate } from "react-router-dom"
import { DropDownList } from "@progress/kendo-react-dropdowns"; 

function ProfileManagement({props}) {
    let navigate = useNavigate();

    const [details, setDetails] = useState({
        name: "",
        mailing_address: "",
        billing_address: "",
        diner: "",
        points: "",
        payment: ""
    })

    const [selectedPayment, setSelectedPayment] = useState(null);

    const handleChange = (event) => {
        setDetails({...details, [event.target.name]: event.target.value});
    }
    
    const newHandle = () => {
        setDetails({
            name: details.name,
            mailing_address: details.mailing_address,
            billing_address: details.billing_address,
            diner: details.diner,
            points: details.points,
            payment: selectedPayment,
        });
    }
    const handleSubmit = async (event) => {
        setDetails(props)
        console.log(details)
        event.preventDefault()
        setDetails({
            name: details.name,
            mailing_address: details.mailing_address,
            billing_address: details.billing_address,
            diner: details.diner,
            points: details.points,
            payment: selectedPayment,
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

    const [payment, setPayment] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/payment',{
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
            // NOTE: investigate. inspect shows payment is undefined maybe.
            setPayment(data.result.payment)
        })
    },[payment]);

    return(
        <div classname="EditProfile">
            <h1>Edit profile</h1>
            <div class="body">
                <form onClick={newHandle} onSubmit={handleSubmit}>
                    <label>
                        <div class="input">                            
                            Full Name:
                            <input type="text"
                                   name="name"
                                   value={setDetails.name}
                                   placeholder={details.name}
                                   maxLength = "50"
                                   onChange={handleChange}
                            /><br></br>
                        </div>
                        <div class="input">
                            Mailing Address:
                            <input type="text"
                                   name="mailing_address"
                                   value={setDetails.mailing_address}
                                   placeholder={details.mailing_address}
                                   maxLength = "100"
                                   required
                                   onChange={handleChange}
                            /><br></br>
                        </div>
						<div class="input">
                            Billing Address:
                            <input type="text"
                                   name="billing_address"
                                   value={setDetails.billing_address}
                                   placeholder={details.billing_address}
                                   maxLength = "100"
                                   onChange={handleChange}
                            /><br></br>
                        </div>
						<div class="input">
                            Preferred Diner:
                            <input type="text"
                                   name="diner"
                                   value={setDetails.diner}
                                   placeholder={details.diner}
                                   maxLength = "100"
                                   required
                                   onChange={handleChange}
                            /><br></br>
                        </div>
                        <div class="input">
                            Loyalty Points:
                            <input type="text"
                                   name="points"
                                   value={setDetails.points}
                                   placeholder={details.points}
                                   pattern="[0-9]{5,}"
                                   required
                                   onChange={handleChange}
                            /><br></br>
                        </div>
						<div class="input">
                        Preferred Payment Method
                            <select class="box" name="payment" value={selectedPayment}
                            onChange={(payment) => setSelectedPayment(payment.target.value)} required>
                            <option value = "none" selected disabled hidden>Payment Method</option>
                            <option value = "cash">Cash</option>
                            <option value = "credit">Credit</option>
                            <option value = "check">Check</option>
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