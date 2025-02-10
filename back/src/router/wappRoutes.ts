import express from "express";
import { sendMessage, getChatHistory } from "../controllers/wappController";

const router = express.Router();

router.post("/send", sendMessage);  // Send a WhatsApp message
router.get("/history/:phone", getChatHistory);  // Get chat history for a user

export default router;