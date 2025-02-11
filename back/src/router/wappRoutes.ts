import { Router } from "express";
import { wappController } from "../controllers/wappController";
import { config } from "../config/validateEnv";
const WappRouter = Router();

const { WEBHOOK_VERIFY_TOKEN } = config;

/**
 * @swagger
 * tags:
 *   name: WhatsApp
 *   description: API for WhatsApp messaging and chat history
 */

/**
 * Error handling middleware for async routes
 */
const handleRouteError = (res: any, error: unknown) => {
    res.status(500).json({
      message: "Unexpected error in WhatsApp route",
      error: error instanceof Error ? error.message : "Unknown error",
    });
};

/**
 * @swagger
 * /api/wapp/send:
 *   post:
 *     summary: Send a WhatsApp message
 *     tags: [WhatsApp]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 description: Phone number of the recipient
 *               message:
 *                 type: string
 *                 description: Message content
 *     responses:
 *       200:
 *         description: Message sent successfully
 *       400:
 *         description: Bad request - Invalid data
 *       500:
 *         description: Internal server error
 */
WappRouter.post("/send", async (req, res) => {
    try {
        await wappController.sendMessage(req, res);
    } catch (error) {
        handleRouteError(res, error);
    }
});

/**
 * @swagger
 * /api/wapp/history/{phone}:
 *   get:
 *     summary: Get chat history for a user
 *     tags: [WhatsApp]
 *     parameters:
 *       - in: path
 *         name: phone
 *         required: true
 *         schema:
 *           type: string
 *         description: Phone number to retrieve chat history
 *     responses:
 *       200:
 *         description: Successfully retrieved chat history
 *       404:
 *         description: Chat history not found
 *       500:
 *         description: Internal server error
 */
WappRouter.get("/history/:phone", async (req, res) => {
    try {
        await wappController.getChatHistory(req, res);
    } catch (error) {
        handleRouteError(res, error);
    }
});

/**
 * @swagger
 * /api/wapp/webhook:
 *   get:
 *     summary: Get whatsapp webhook
 *     tags: [WhatsApp]
 *     parameters:
 *         schema:
 *           type: string
 *         description: whatsapp webhook
 *     responses:
 *       200:
 *         description: Successfully retrieved whatsapp webhook
 *       404:
 *         description: whatsapp webhook not found
 *       500:
 *         description: Internal server error
 */
WappRouter.get("/webhook", (req, res) => {
    console.log(req.query);
    res.send("res: webhook");

    // const mode = req.query["hub.mode"];
    // const challenge = req.query["hub.challenge"];
    // const token = req.query["hub.verify_token"];

    // if (mode && token === WEBHOOK_VERIFY_TOKEN) {
    //     res.status(200).send(challenge);
    //     console.log(req.query);
    //     console.log("200 ok");
    //      } else {
    //         res.sendStatus(403);
    //         console.log("403 error");
    //     }
  
    // try {
    //     await wappController.getChatHistory(req, res);
        
    // } catch (error) {
    //     handleRouteError(res, error);
    // }
});

export default WappRouter;


//****************** version ok with wappController previous version ******* */
// import express from "express";
// import { sendMessage, getChatHistory } from "../controllers/wappController";

// const router = express.Router();

// router.post("/send", sendMessage);  // Send a WhatsApp message
// router.get("/history/:phone", getChatHistory);  // Get chat history for a user

// export default router;