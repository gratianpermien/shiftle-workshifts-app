import express from "express";
import { requireSendMail } from "../controllers/mails.controller.js";

const router = express.Router();
router.post("/send", requireSendMail);

export default router;
