import React, {useEffect, useState} from "react";
import styles from './FuelQuote.module.css';



function FuelQuoteHistory(){

    const dateTimeParser = (string)=>{
        const a = string.slice(0,10) + " "
        let c = string.slice(11,13)
        c =  + c //converts string to integer
        if((c - 12) < 0){
            c += 7;
            c = c.toString();
            c += string.slice(13,16) + "AM"
        }else if(c - 17 === 0){
            c = "12"
            c += string.slice(13,16) + "PM"   
        }else{
            c -= 17;
            c = c.toString();
            c += string.slice(13,16) + "PM"
    }
    console.log("dateTimeParser has finished")
    return a + c
    }
    
    const [backendDetails, setBackendDetails] = React.useState({
        id: 0,
        username: "",
        password: ""
    })

    useEffect(() => {
        fetch('http://localhost:5000/login_info')
        .then(res => {
            return res.json();
        })
        .then( data => {
            setBackendDetails(data.currentlyLoggedIn.at(0))
        })
    },[]);

    const [backendData, setBackendData] = React.useState([])
    const value = {backendDetails}
    
    useEffect(() => {
        fetch('http://localhost:5000/quote_info',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
        })
        .then(res => {
            return res.json();
        })
        .then( data => {
            //console.log(data)
            setBackendData(data.result)
        })
    },[backendDetails]);
    
   
    return(
        <div className="FuelQuoteHistory">
            <div className={styles.table_box}>
                <table className={styles.table}>
                    {console.log(backendData)}
                <tr>
                    <th className={styles.th}>Delivery Date</th>
                    <th className={styles.th}>Delivery Address</th>
                    <th className={styles.th}>Gallons Requested</th>
                    <th className={styles.th}>Suggested Price/Gallons</th>
                    <th className={styles.th}>Total Amount</th>
                </tr>
            {backendData.map((val,key) =>{
                    return(
                        <tr key={val.key}>
                            <th className={styles.th}>{dateTimeParser(val.Deliver_Date)}</th>
                            <th className={styles.th}>{val.Delivery_Address}</th>
                            <th className={styles.th}>{val.Gallons_Requested}</th>
                            <th className={styles.th}>{val.Suggested_Price}</th>
                            <th className={styles.th}>{val.Total_Amount}</th>
                        </tr>
                    );
                })} 
            </table>
            </div>
        </div>
    );
}

export default FuelQuoteHistory