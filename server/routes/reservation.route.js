import express from "express";
import {reservationInfo, reservationID, reservationAvailable } from "../controllers/reservation.controller.js";

const router = express.Router();

router.post('/reservation', reservationInfo);

router.post('/reservationID', reservationID);

router.post('/reservationAvailable', reservationAvailable)

export default router;