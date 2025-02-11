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
 * /api/wapps/send:
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


WappRouter.post("/send", async (req, res) => {
    try {
        await wappController.sendTemplate(req, res);
    } catch (error) {
        handleRouteError(res, error);
    }
});


/**
 * @swagger
 * /api/wapps/history/{phone}:
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
 * /api/wapps/webhook:
 *   get:
 *     summary: Verify and retrieve WhatsApp webhook
 *     tags: [WhatsApp]
 *     description: |
 *       Endpoint used by WhatsApp to verify webhook configuration.
 *       The request must include the `hub.mode`, `hub.challenge`, and `hub.verify_token` as query parameters.
 *     parameters:
 *       - in: query
 *         name: hub.mode
 *         required: false
 *         schema:
 *           type: string
 *         description: The mode of the webhook (e.g., "subscribe").
 *       - in: query
 *         name: hub.challenge
 *         required: false
 *         schema:
 *           type: string
 *         description: The challenge token sent by WhatsApp.
 *       - in: query
 *         name: hub.verify_token
 *         required: false
 *         schema:
 *           type: string
 *         description: The verification token set in the WhatsApp Business API.
 *     responses:
 *       200:
 *         description: Webhook verified successfully.
 *       403:
 *         description: Verification failed due to incorrect token.
 *       500:
 *         description: Internal server error.
 */
WappRouter.get("/webhook", async (req, res) => {
    try {
        // console.log(req.query);
        // res.send();
        // await wappController.getWebhook(req, res);

    const mode = req.query['hub.mode'];
    const challenge = req.query['hub.challenge'];
    const token = req.query['hub.verify_token'];
  
    if (mode && token === WEBHOOK_VERIFY_TOKEN) {
      res.status(200).send(challenge);
      console.log("Webhook verification successful.");
    } else {
      res.sendStatus(403);
      console.log("Webhook verification failed.");
    }



    } catch (error) {
        handleRouteError(res, error);
    }
    // console.log("Received webhook request:", req.query);
    // console.log("Webhook Verify Token2:", WEBHOOK_VERIFY_TOKEN);
    // res.send();

    // const mode = req.query['hub.mode'];
    // const challenge = req.query['hub.challenge'];
    // const token = req.query['hub.verify_token'];
  
    // if (mode && token === WEBHOOK_VERIFY_TOKEN) {
    //   res.status(200).send(challenge);
    //   console.log("Webhook verification successful.");
    // } else {
    //   res.sendStatus(403);
    //   console.log("Webhook verification failed.");
    // }
  });

/**
 * @swagger
 * /api/wapps/:
 *   get:
 *     summary: Root endpoint for WhatsApp API
 *     tags: [WhatsApp]
 *     description: Basic root endpoint for checking WhatsApp API status.
 *     responses:
 *       200:
 *         description: Root endpoint is working.
 *       500:
 *         description: Internal server error.
 */
  WappRouter.get("/", async (req, res) => {
      try {
        res.send("webhook root");
        // await wappController.getRoot(req, res);
    } catch (error) {
        handleRouteError(res, error);
    }
  });


export default WappRouter;


//****************** version ok with wappController previous version ******* */
// import express from "express";
// import { sendMessage, getChatHistory } from "../controllers/wappController";

// const router = express.Router();

// router.post("/send", sendMessage);  // Send a WhatsApp message
// router.get("/history/:phone", getChatHistory);  // Get chat history for a user

// export default router;