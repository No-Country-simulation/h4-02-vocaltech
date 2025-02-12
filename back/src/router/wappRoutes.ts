import { Router } from "express";
import { wappController } from "../controllers/wappController";
import { config } from "../config/validateEnv";
import axios from "axios";
import { base } from "../config/airtableConfig";

const WappRouter = Router();
const { WEBHOOK_VERIFY_TOKEN } = config;
const WHATSAPP_API_URL = `https://graph.facebook.com/v17.0/${process.env.WHATSAPP_ACCESS_TEST_PHONE_NUMBER}/messages`;
const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;


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


// WEBHOOK SIDE: ROUTES GET AND POST 

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
});

WappRouter.post("/webhook", async (req, res) => {
    try {
        // console.log(JSON.stringify(req.body, null, 2));
        // res.status(200).send("Webhook received");

        console.log("Incoming Webhook Data:", JSON.stringify(req.body, null, 2));


        const { entry } = req.body

        if (!entry || entry.length === 0) {
          return res.status(400).send('Invalid Request')
        }
      
        const changes = entry[0].changes
      
        if (!changes || changes.length === 0) {
          return res.status(400).send('Invalid Request')
        }
      
        const statuses = changes[0].value.statuses ? changes[0].value.statuses[0] : null
        const messages = changes[0].value.messages ? changes[0].value.messages[0] : null
      
        if (statuses) {
          // Handle message status
          console.log(`
            MESSAGE STATUS UPDATE:
            ID: ${statuses.id},
            STATUS: ${statuses.status}
          `)
        }
      
        if (messages) {

            // Extract required data
            const senderPhone = messages.from;
            const messageBody = messages.text?.body || null;
            const timestamp = messages.timestamp;
            if (messageBody) {
                // Store message in Airtable via service function
                await wappController.storeMessage(senderPhone, messageBody, timestamp);
            }



          // Handle received messages
          if (messages.type === 'text') {
            if (messages.text.body.toLowerCase() === 'hello') {
              replyMessage(messages.from, 'Hello. How are you?', messages.id)
            }
      
            // if (messages.text.body.toLowerCase() === 'list') {
            //   sendList(messages.from)
            // }
      
            // if (messages.text.body.toLowerCase() === 'buttons') {
            //   sendReplyButtons(messages.from)
            // }
          }
      
          if (messages.type === 'interactive') {
            if (messages.interactive.type === 'list_reply') {
              sendMessage(messages.from, `You selected the option with ID ${messages.interactive.list_reply.id} - Title ${messages.interactive.list_reply.title}`)
            }
      
            if (messages.interactive.type === 'button_reply') {
              sendMessage(messages.from, `You selected the button with ID ${messages.interactive.button_reply.id} - Title ${messages.interactive.button_reply.title}`)
            }
          }
          
          console.log(JSON.stringify(messages, null, 2))
        }
        
        res.status(200).send('Webhook processed')


    } catch (error) {
        handleRouteError(res, error);
    }
});


WappRouter.post("/send", async (req, res) => {
    try {
        await wappController.sendMessage(req, res);
    } catch (error) {
        handleRouteError(res, error);
    }
});

async function sendMessage(to: string, body: string) {
    await axios({
      url: 'https://graph.facebook.com/v21.0/phone_number_id/messages',
      method: 'post',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        messaging_product: 'whatsapp',
        to,
        type: 'text',
        text: {
          body
        }
      })
    })
  }

  async function replyMessage(to: string, body: string, messageId: string) {
    await axios({
      url: 'https://graph.facebook.com/v21.0/phone_number_id/messages',
      method: 'post',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        messaging_product: 'whatsapp',
        to,
        type: 'text',
        text: {
          body
        },
        context: {
          message_id: messageId
        }
      })
    })
  }



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
        res.send("webhook root 202502121848");
        // await wappController.getRoot(req, res);
    } catch (error) {
        handleRouteError(res, error);
    }
  });


export default WappRouter;
