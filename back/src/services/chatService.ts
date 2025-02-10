import { config } from "../config/validateEnv";
import { AirtableRecord } from "../utils/airtableInterfaces";
import Chat, { ChatFields } from "../models/Chat";

const fetch = require('node-fetch');

export const chatService = {
  async findChatById(id: string): Promise<AirtableRecord["fields"] | null> {
    const { AIRTABLE_API_KEY, chatsTableUrl } = config;

    const response = await fetch(`${chatsTableUrl}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch chat from Airtable: ${errorText}`);
    }

    // Explicitly cast the JSON response to `AirtableRecord`
    const chat = (await response.json()) as AirtableRecord;
    return chat.fields || null;
  },

  async deleteChatById(id: string): Promise<boolean> {
    const { AIRTABLE_API_KEY, chatsTableUrl } = config;

    const response = await fetch(`${chatsTableUrl}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete chat from Airtable: ${errorText}`);
    }

    return true;
  },

  async updateChatById(id: string, data: Partial<AirtableRecord["fields"]>): Promise<AirtableRecord["fields"]> {
    const { AIRTABLE_API_KEY, chatsTableUrl } = config;

    const response = await fetch(`${chatsTableUrl}/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields: data }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update chat in Airtable: ${errorText}`);
    }

    const updatedChat = (await response.json()) as AirtableRecord;
    return updatedChat.fields;
  },

  async patchChatById(id: string, data: Partial<AirtableRecord["fields"]>): Promise<AirtableRecord["fields"]> {
    const existingChat = await this.findChatById(id);
    if (!existingChat) {
      throw new Error(`Chat with ID ${id} not found`);
    }

    const updatedData = { ...existingChat, ...data };

    return this.updateChatById(id, updatedData);
  },  

  async createChat(data: ChatFields): Promise<Chat> {
    const { AIRTABLE_API_KEY, chatsTableUrl } = config;

    const response = await fetch(chatsTableUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields: data }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create chat in Airtable: ${errorText}`);
    }

    const newChat = (await response.json()) as Chat;
    return newChat;
  },

};
 