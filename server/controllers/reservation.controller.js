import reservationtable from "../reservationtable.js";
import bcrypt from 'bcrypt';
const reservations = new reservationtable();

const reservationInfo = async (req, res) => {
    
    const details = req.body
    const HOT_TIME = 3
    
    await reservations.createReservation(details.username, details.start, details.end, details.tables)
    reservations.checkIfHighTraffic(details.start)
        .then((result) => {
            if (result[0]['COUNT(id)'] >= HOT_TIME) {
                res.json(true)
                res.send(true)
            }
            else {
                res.json(false)
                res.send(false)
            }
        })
}

const reservationID = (req, res) => {
    reservations.checkReservations ()
    .then ((result) => {
        res.json(result);
        res.send(result);
    })
}

export const reservationAvailable = (req, res) => {
    const details = req.body
    const MAX_TABLES = 20
    
    reservations.checkIfTablesAvailable(details.start, details.end)
        .then((result) => {
            if (result) {
                const answer = result[0]['SUM(tables)'] + details.tables <= MAX_TABLES
                res.json(answer)
                res.send(answer)
            }
                res.json(true)
                res.send(true)                
        })
}

export {reservationInfo, reservationID};