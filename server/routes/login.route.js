import express from "express";
import {loginInfo, getLoginInfo } from "../controllers/login.controller.js";

const router = express.Router();

router.post('/login', loginInfo);

router.get('/login_info', getLoginInfo)

export default router;