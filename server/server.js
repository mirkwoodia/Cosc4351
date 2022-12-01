import express from 'express';
import registerRoute from "./routes/register.route.js";
import loginRoute from "./routes/login.route.js";
import pmRoute from "./routes/pm.route.js";
import reservationRoute from "./routes/reservation.route.js"
import paymentRoute from "./routes/payment.route.js";

const app = express();
app.use(express.static('public'))
////////// Below (lines 5,6,7 does similar things as lines 9,10 keeping just in case) ////////
//const bodyParser = require('body-parser');
//app.use(bodyParser.urlencoded({extended: true}));
//app.use(bodyParser.json());
///////// above (lines 5,6,7 does similar things as lines 9,10 keeping just in case)////////
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.listen(5000, () => console.log("server created in 5000"))

app.all('/*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
  
    next();
  });



app.use('/', registerRoute);
app.use('/', loginRoute);
app.use('/', pmRoute);
app.use('/', reservationRoute)
app.use('/', paymentRoute);