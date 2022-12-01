import reservationtable from "../reservationtable.js";
import bcrypt from 'bcrypt';
const reservations = new reservationtable();

const reservationInfo = (req, res) => {

    reservations.createReservation(req.body.details.username, req.body.details.start)
        .then((answer) => {
            res.json(answer);
            res.send(answer);
        });
}

const reservationID = (req, res) => {
    reservations.checkReservations ()
    .then ((result) => {
        res.json(result);
        res.send(result);
    })
}

export {reservationInfo, reservationID};