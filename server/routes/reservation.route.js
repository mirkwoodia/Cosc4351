import express from "express";
import {reservationInfo} from "../controllers/reservation.controller.js";

const router = express.Router();

router.post('/reservation', reservationInfo);

export default router;