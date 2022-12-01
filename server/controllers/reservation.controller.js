import reservationtable from "../reservationtable.js";
import bcrypt from 'bcrypt';
const reservations = new reservationtable();

const reservationInfo = (req, res) => {
    reservations.checkReservations()
        .then((result) =>{
            if(result>=3){
                reservations.createReservation(req.body.details.username, req.body.details.start)
                .then((answer) => {
                    res.json(answer);
                    res.send(answer);
                });
            }
            else{
                reservations.createReservation(req.body.details.username, req.body.details.start)
                .then((answer) => {
                    res.json(answer);
                    res.send(answer);
                });
                }
            
        })


}

export default reservationInfo;