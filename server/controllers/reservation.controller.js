import reservationtable from "../reservationtable";
import bcrypt from 'bcrypt';
const reservations = new reservationtable();

const reservationInfo = (req, res) => {
    if (req.body.details.username != '' && req.body.details.start != '') {
        reservations.getByStart(req.body.details.start)
            .then((result) => {
                const s = result.start;
                if (result == undefined)
                {
                    let password = req.body.details.password;
                    bcrypt.hash(password, 10)
                    reservations.createReservation(req.body.details.username, s)
                        .then((answer) => {
                            res.json(answer);
                            res.send(answer);
                        })
                } else
                    res.send({message: "That timeslot is booked, please try another one."});
            });
    }
}

export default reservationInfo;