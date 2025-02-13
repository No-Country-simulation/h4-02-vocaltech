import axios from "axios";
import { base } from "../config/airtableConfig";

const WHATSAPP_API_URL = `https://graph.facebook.com/v17.0/${process.env.WHATSAPP_ACCESS_TEST_PHONE_NUMBER}/messages`;
const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

const wappurl = `https://graph.facebook.com/v20.0/${process.env.WHATSAPP_ACCESS_TEST_PHONE_NUMBER}`
const phone_number = '541124020248'


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


  async sendWhatsAppMessage(phone: string, message: string) {
    try {
        await axios.post(
            "https://graph.facebook.com/v21.0/phone_number_id/messages",
            {
                messaging_product: "whatsapp",
                to: phone,
                type: "text",
                text: { body: message },
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        console.error("Error sending WhatsApp message:", error);
    }
},

async storeMessageToAirtable(phone: string, message: string, timestamp: string) {
    try {
        await base("Chats").create([
            {
                fields: {
                    Phone: phone,
                    Message: message,
                    Timestamp: timestamp,
                    Direction: "INCOMING", // Mark as received message
                },
            },
        ]);
        console.log(`Message stored: ${message} from ${phone}`);
    } catch (error) {
        console.error("Error storing message in Airtable:", error);
    }
},



    async sendTemplate(phone: string, template: string) {
      try {
        const response = await axios({
            url: `${wappurl}/messages`,
            method: 'post',
            headers: {
                'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                messaging_product: 'whatsapp',
                to: phone,
                type: 'template',
                template:{
                    name: template,
                    language: {
                        code: 'es_AR'
                    }
                }
            })
        })
    
        console.log(response.data)
  
        // Store message in Airtable
        // await base("Chats").create([{ fields: { Phone: phone, Message: message, SentBy: "Admin" } }]);
  
        return response.data;
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : "POST Unknown error");
      }
    },

    async sendTemplateAuto(phone: string, template: string) {
        try {
          const response = await axios({
              url: `${wappurl}/messages`,
              method: 'post',
              headers: {
                  'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
                  'Content-Type': 'application/json'
              },
              data: JSON.stringify({
                  messaging_product: 'whatsapp',
                  to: phone,
                  type: 'template',
                  template:{
                      name: template,
                      language: {
                          code: 'en_US'
                      }
                  }
              })
          })
      
          console.log(response.data)
    
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
