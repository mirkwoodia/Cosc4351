
import React, {useEffect, useState} from "react";
import styles from './FuelQuote.module.css';
import DateTimePicker from 'react-datetime-picker';

function FuelQuoteForm({props}){
    //let navigate = useNavigate();

    const [quoteState, setQuoteState] = useState(false);
    const [backendDetails, setBackendDetails] = useState({
        id: 0,
        username: "",
        password: "",
    })
    const [address,setAddress] = useState({})

    useEffect(() => {
        fetch('http://localhost:5000/login_info')
        .then(res => {
            return res.json();
        })
        .then( data => {
            setBackendDetails(data.currentlyLoggedIn.at(0))
        })
    },[]);

    const info = {backendDetails}
    useEffect(() => {
        fetch('http://localhost:5000/getAddress',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
        .then(res => {
            return res.json();
        })
        .then( data => {
            setAddress(data)
        })
    },[backendDetails]);
    const [selectedDate,setSelectedDated] = useState(null);
    const [data,setData] = useState({
        Gal_Req: 0,
        Del_Add: address,
        Del_Dat: "",
        Sug_Pri: 689,
        Tot_Amo: 0,
        Users_Id: 0,
        username: null
    })
    
    const handleChange = (event) => {
        setData({...data, [event.target.name]: event.target.value});
    }
    const getQuote = async (event) => {
        event.preventDefault();
        if (data.Gal_Req !== 0) {
            const value = {data};
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(value)
            };
            const response = await fetch("http://localhost:5000/pricing_module", options);
            const quote = await response.json();
            //console.log(quote.price);
            //console.log(quote.total);
            setData({
                Gal_Req: data.Gal_Req,
                Del_Add: address,
                Del_Dat: selectedDate,
                Sug_Pri: quote.price,
                Tot_Amo: quote.total,
                Users_Id: backendDetails.id,
                username: backendDetails.username
            })
            setQuoteState(true)
        }
    }
    const newHandle = () =>{
        setData({
            Gal_Req: data.Gal_Req,
            Del_Add: address,
            Del_Dat: selectedDate,
            Sug_Pri: data.Sug_Pri,
            Tot_Amo: data.Gal_Req * data.Sug_Pri,
            Users_Id: backendDetails.id,
            username: backendDetails.username
        });
        
    }
    //submits data to the backend
    const handleSubmit = async (event) => {
        setData(props);
        event.preventDefault();
        
        setData({
            Gal_Req: data.Gal_Req,
            Del_Add: address,
            Del_Dat: data.Del_Dat,
            Sug_Pri: data.Sug_Pri,
            Tot_Amo: data.Gal_Req * data.Sug_Pri,
            Users_Id: backendDetails.id
        });
        const value = {data};

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
        };
        const response = await fetch("http://localhost:5000/create",options);
        const b = await response.json();
        
            
        
    }

    return(
        <div className="FuelQuoteForm">
            <div data-testid="test_1" className="fuelQuoteForm">
                <div className={styles.FuelQuoteForm_container}>
                    <form onClick={newHandle} onSubmit={handleSubmit}>
                        <div data-testid="test_2" className={styles.FuelQuoteForm_p}>
                            {console.log(quoteState)}
                            Gallons Requested:
                                <input type="text"
                                    className={styles.FuelQuoteForm_inputText}
                                    name="Gal_Req"
                                    value={setData.Gal_Req}
                                    placeholder={"Please Enter Amount of Gallons"}
                                    onChange={handleChange}
                                    required
                                />

                            Deliver Address:
                                <input type="text"
                                    className={styles.FuelQuoteForm_inputText}
                                    name="Del_Add"
                                    readOnly={true}
                                    placeholder="Address"
                                    value={address}
                                    />

                            Deliver Date:
                            <div className={styles.DateTextBox}> 
                                <div className={styles.DateText}>

                            <DateTimePicker 
                                onChange={setSelectedDated}
                                autoFocus={true}
                                format="y-MM-dd h:mm a"
                                value={selectedDate}
                                placeholder="Date"
                                disableClock={true}
                                minDate={new Date()}
                                hourPlaceholder="hh"
                                minutePlaceholder="mm"
                                dayPlaceholder="dd"
                                monthPlaceholder="mm"
                                yearPlaceholder="yyyy"
                                required    
                                />
                                </div>
                            </div>
                            
                            Suggested Price/Gallon:
                            {!quoteState ? (
                                <input type="text"
                                       className={styles.FuelQuoteForm_inputText}
                                       name="Sug_Pri"
                                       readOnly={true}
                                       placeholder={"Suggested Price"}
                                       value={""}
                                />
                            ) : (
                                <input type="text"
                                       className={styles.FuelQuoteForm_inputText}
                                       name="Sug_Pri"
                                       readOnly={true}
                                       placeholder={"Suggested Price"}
                                       value={data.Sug_Pri}
                                />
                            )}


                            Total Amount Due:
                            {!quoteState ? (
                                <input type="text"
                                       className={styles.FuelQuoteForm_inputText}
                                       name="Tot_Amo"
                                       readOnly={true}
                                       placeholder={"Total Amount"}
                                       value={""}
                                />
                            ) : (
                                <input type="text"
                                       className={styles.FuelQuoteForm_inputText}
                                       name="Tot_Amo"
                                       readOnly={true}
                                       placeholder={"Total Amount"}
                                       value={data.Tot_Amo}
                                />
                            )}
                                <input type="button" onClick={getQuote} name="Get Quote" className={styles.FuelQuoteForm_inputSubmit} value="Get Quote"/>
                                <input type="submit" disabled={!quoteState ? true : false} name="Submission" className={styles.FuelQuoteForm_inputSubmit} value="Submit"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default FuelQuoteForm;
