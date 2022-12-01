import express from "express";
import {getPayment} from "../controllers/payment.controller.js";

const router = express.Router();

router.post('/payment', getPayment)

export default router;