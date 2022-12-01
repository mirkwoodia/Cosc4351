import express from "express";
import {reservationInfo, reservationID} from "../controllers/reservation.controller.js";

const router = express.Router();

router.post('/reservation', reservationInfo);

router.post('/reservationID', reservationID);

export default router;