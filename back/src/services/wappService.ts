import axios from "axios";
import { base } from "../config/airtableConfig";

const WHATSAPP_API_URL = `https://graph.facebook.com/v17.0/${process.env.WHATSAPP_ACCESS_TEST_PHONE_NUMBER}/messages`;
const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

export const wappService = {
  async sendMessage(phone: string, message: string) {
    try {
      const response = await axios.post(
        WHATSAPP_API_URL,
        {
          messaging_product: "whatsapp",
          to: phone,
          text: { body: message },
        },
        { headers: { Authorization: `Bearer ${ACCESS_TOKEN}`, "Content-Type": "application/json" } }
      );

      // Store message in Airtable
      // await base("Chats").create([{ fields: { Phone: phone, Message: message, SentBy: "Admin" } }]);

      return response.data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "POST Unknown error");
    }
  },

  async getChatHistory(phone: string) {
    try {
      const records = await base("Chats").select({ filterByFormula: `{Phone} = '${phone}'` }).all();
      return records.map((record) => record.fields);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "GET Unknown error");
    }
  },
};
