import { Request, Response } from "express";
import { wappService } from "../services/wappService";
import { config } from "../config/validateEnv";
const { WEBHOOK_VERIFY_TOKEN } = config;

export const wappController = {
  async sendMessage(req: Request, res: Response): Promise<Response> {
    try {
      const { phone, message } = req.body;
      const response = await wappService.sendMessage(phone, message);
      return res.status(200).json({ success: true, response });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "POST Unknown error";
      console.error("Error sending message:", errorMessage);

      return res.status(500).json({
        success: false,
        error: errorMessage,
      });
    }
  },

  async sendMessage0(req: Request, res: Response) {
    try {
        const { phone, message } = req.body;
        await wappService.sendWhatsAppMessage(phone, message);
        res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
        res.status(500).json({ error: error });
    }
},


  async storeMessage(senderPhone: string, messageBody: string, timestamp: string) {
    try {
        console.log(`Storing message from ${senderPhone}: ${messageBody}`);
        await wappService.storeMessageToAirtable(senderPhone, messageBody, timestamp);
    } catch (error) {
        console.error("Error storing message:", error);
    }
},


    async sendTemplate(req: Request, res: Response): Promise<Response> {
      try {
        const { phone, message } = req.body;
        const response = await wappService.sendTemplate(phone, message);
        return res.status(200).json({ success: true, response });
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "POST Unknown error";
        console.error("Error sending message:", errorMessage);
  
        return res.status(500).json({
          success: false,
          error: errorMessage,
        });
      }
    },

  async getChatHistory(req: Request, res: Response): Promise<Response> {
    try {
      const { phone } = req.params;
      const chatHistory = await wappService.getChatHistory(phone);
      return res.status(200).json(chatHistory);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "GET Unknown error";
      console.error("Error fetching chat history:", errorMessage);

      return res.status(500).json({
        success: false,
        error: errorMessage,
      });
    }
  },

  async getWebhook(req: Request, res: Response): Promise<Response> {
    try {
        console.log("Received webhook request:", req.query);
        console.log("Webhook Verify Token2:", WEBHOOK_VERIFY_TOKEN);
      res.send();
      return res.status(200).json(req.query);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "GET Unknown error";
      console.error("Error fetching webhook:", errorMessage);

      return res.status(500).json({
        success: false,
        error: errorMessage,
      });
    }
  },

  async getRoot(req: Request, res: Response): Promise<Response> {
    try {
      res.send("webhook root");
      return res.status(200).json(req.query);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "GET Unknown error";
      console.error("Error fetching webhook:", errorMessage);

      return res.status(500).json({
        success: false,
        error: errorMessage,
      });
    }
  },



};



//**************** version ok ************** */
// import { Request, Response } from "express";
// import axios from "axios";
// import { base } from "../config/airtableConfig";

// const wappurl = `https://graph.facebook.com/v20.0/${process.env.WHATSAPP_ACCESS_TEST_PHONE_NUMBER}`
// const WHATSAPP_API_URL = `https://graph.facebook.com/v17.0/${process.env.WHATSAPP_ACCESS_TEST_PHONE_NUMBER}/messages`;
// const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

// export async function sendMessage(req: Request, res: Response) {
//   const { phone, message } = req.body;

//   try {
//     const response = await axios.post(
//       WHATSAPP_API_URL,
//       {
//         messaging_product: "whatsapp",
//         to: phone,
//         text: { body: message },
//       },
//       { headers: { Authorization: `Bearer ${ACCESS_TOKEN}`, "Content-Type": "application/json" } }
//     );

//     // Store message in Airtable
//     // await base("Chats").create([{ fields: { Phone: phone, Message: message, SentBy: "Admin" } }]);

//     res.json({ success: true, response: response.data });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error instanceof Error ? error.message : "POST Unknown error" });
//   }
// }

// export async function getChatHistory(req: Request, res: Response) {
//   const { phone } = req.params;
//   try {
//     const records = await base("Chats").select({ filterByFormula: `{Phone} = '${phone}'` }).all();
//     res.json(records.map((record) => record.fields));
//   } catch (error) {
//     res.status(500).json({ success: false, error: error instanceof Error ? error.message : "GET Unknown error" });
//   }
// }
