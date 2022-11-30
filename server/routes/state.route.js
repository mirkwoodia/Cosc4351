import express from "express";
import {getStates} from "../controllers/state.controller.js";

const router = express.Router();

router.post('/states', getStates)

export default router;