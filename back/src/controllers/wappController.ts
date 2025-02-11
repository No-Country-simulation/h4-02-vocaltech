import { Request, Response } from "express";
import { wappService } from "../services/wappService";

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
