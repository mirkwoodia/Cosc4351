import reservationtable from "../reservationtable.js";
import bcrypt from 'bcrypt';
const reservations = new reservationtable();

const reservationInfo = (req, res) => {

    reservations.createReservation(req.body.details.username, s)
        .then((answer) => {
            res.json(answer);
            res.send(answer);
        });
}

export default reservationInfo;