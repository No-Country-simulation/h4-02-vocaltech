import { Request, Response } from "express";
import { chatService } from "../services/chatService";
import Chat, { ChatFields } from "../models/Chat";

export const chatController = {
  async getChatById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const chat = await chatService.findChatById(id);

      if (!chat) {
        return res.status(404).json({
          message: "Chat not found",
        });
      }

      return res.status(200).json({
        message: "Chat retrieved successfully",
        chat,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unexpected error";
      console.error("Error fetching chat by ID:", errorMessage);

      return res.status(500).json({
        message: "Failed to fetch chat",
        error: errorMessage,
      });
    }
  },

  async deleteChatById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const deleted = await chatService.deleteChatById(id);

      if (!deleted) {
        return res.status(404).json({
          message: "Chat not found",
        });
      }

      return res.status(200).json({
        message: "Chat deleted successfully",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unexpected error";
      console.error("Error deleting chat:", errorMessage);

      return res.status(500).json({
        message: "Failed to delete chat",
        error: errorMessage,
      });
    }
  },

  async editChatById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const chatData = req.body;

      const updatedChat = await chatService.updateChatById(id, chatData);

      return res.status(200).json({
        message: "Chat updated successfully",
        chat: updatedChat,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unexpected error";
      console.error("Error updating chat:", errorMessage);

      return res.status(500).json({
        message: "Failed to update chat",
        error: errorMessage,
      });
    }
  },

  async patchChatById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const chatData = req.body;

      const updatedChat = await chatService.patchChatById(id, chatData);

      return res.status(200).json({
        message: "Chat patched successfully",
        chat: updatedChat,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unexpected error";
      console.error("Error patching chat:", errorMessage);

      return res.status(500).json({
        message: "Failed to patch chat",
        error: errorMessage,
      });
    }
  },

  async createChat(req: Request, res: Response): Promise<Response> {
    try {
      const chatData: ChatFields = req.body;

      // Basic validation for required fields
      const requiredFields: (keyof ChatFields)[] = [

      ];

      const missingFields = requiredFields.filter((field) => !chatData[field]);
      if (missingFields.length > 0) {
        return res.status(400).json({
          message: `Missing required fields: ${missingFields.join(", ")}`,
        });
      }

      // Create new chat in Airtable
      const newChat = await chatService.createChat(chatData);

      return res.status(201).json({
        message: "Chat created successfully",
        chat: newChat,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unexpected error";
      console.error("Error creating chat:", errorMessage);

      return res.status(500).json({
        message: "Failed to create chat",
        error: errorMessage,
      });
    }
  },


};
