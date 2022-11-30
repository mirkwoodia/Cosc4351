import express from "express";
import registerInfo from "../controllers/register.controller.js";
const router = express.Router();

router.post('/register', registerInfo);

export default router;