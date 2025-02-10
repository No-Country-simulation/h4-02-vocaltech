import { Router } from "express";
import { chatController } from "../controllers/chatController";

const ChatRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Chats
 *   description: API for chat management
 */

/**
 * Error handling middleware for async routes
 */
const handleRouteError = (res: any, error: unknown) => {
    res.status(500).json({
      message: "Unexpected error in user route",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  };

// Route to get chat by ID
/**
 * @swagger
 * /api/chats/{id}:
 *   get:
 *     summary: Get a chat by ID
 *     tags: [Chats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the chat to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved chat
 *       404:
 *         description: Chat not found
 *       500:
 *         description: Internal server error
 */
ChatRouter.get("/:id", async (req, res) => {
  try {
    await chatController.getChatById(req, res);
  } catch (error) {
    res.status(500).json({
      message: "Unexpected error in chat route",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Route to delete chat by ID
/**
 * @swagger
 * /api/chats/{id}:
 *   delete:
 *     summary: Delete a chat by ID
 *     tags: [Chats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the chat to delete
 *     responses:
 *       200:
 *         description: Chat deleted successfully
 *       404:
 *         description: Chat not found
 *       500:
 *         description: Internal server error
 */
ChatRouter.delete("/:id", async (req, res) => {
  try {
    await chatController.deleteChatById(req, res);
  } catch (error) {
    res.status(500).json({
      message: "Unexpected error in chat route",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Route to edit chat by ID
/**
 * @swagger
 * /api/chats/{id}:
 *   put:
 *     summary: Update chat details by ID
 *     tags: [Chats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the chat to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *           example:
 *             NameChat: "OPTIMIZACION DE RECURSOS Y CAPITAL test"
 *             Description: "Al desarrollar un MVP en vez de un chato terminado, las empresas pueden llevar a cabo su idea de negocio con una inversión de tiempo y capital mínima. Pudiendo identificar rápidamente mejoras y ajustes, si es necesario, antes de invertir grandes cantidades de recursos."
 *             Status: "ACTIVO"
 *             Category: ["TECH"]
 *             Question1: ["Insights e ideas alternativas","Developers junior calificados"]
 *             Question2: ["Identificar talento técnico y recursos de capital"]
 *     responses:
 *       200:
 *         description: Chat updated successfully
 *       400:
 *         description: Bad request - Invalid data
 *       404:
 *         description: Chat not found
 *       500:
 *         description: Internal server error
 */
ChatRouter.put("/:id", async (req, res) => {
    try {
      await chatController.editChatById(req, res);
    } catch (error) {
      res.status(500).json({
        message: "Unexpected error in chat route",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

// Route to patch chat by ID (partial update)
/**
 * @swagger
 * /api/chats/{id}:
 *   patch:
 *     summary: Partially update a chat by ID
 *     tags: [Chats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the chat to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *           example:
 *             NameChat: "OPTIMIZACION DE RECURSOS Y CAPITAL test"
 *             Description: "Al desarrollar un MVP en vez de un chato terminado, las empresas pueden llevar a cabo su idea de negocio con una inversión de tiempo y capital mínima. Pudiendo identificar rápidamente mejoras y ajustes, si es necesario, antes de invertir grandes cantidades de recursos."
 *             Status: "ACTIVO"
 *             Category: ["TECH"]
 *             Question1: ["Insights e ideas alternativas","Developers junior calificados"]
 *             Question2: ["Identificar talento técnico y recursos de capital"]
 *     responses:
 *       200:
 *         description: Chat updated successfully
 *       400:
 *         description: Bad request - Invalid data
 *       404:
 *         description: Chat not found
 *       500:
 *         description: Internal server error
 */
ChatRouter.patch("/:id", async (req, res) => {
    try {
      await chatController.patchChatById(req, res);
    } catch (error) {
      res.status(500).json({
        message: "Unexpected error in chat route",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

// Route to create a new chat
/**
 * @swagger
 * /api/chats/new:
 *   post:
 *     summary: Create a new chat
 *     tags: [Chats]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *           example:
 *             NameChat: "OPTIMIZACION DE RECURSOS Y CAPITAL test"
 *             Description: "Al desarrollar un MVP en vez de un chato terminado, las empresas pueden llevar a cabo su idea de negocio con una inversión de tiempo y capital mínima. Pudiendo identificar rápidamente mejoras y ajustes, si es necesario, antes de invertir grandes cantidades de recursos."
 *             Status: "ACTIVO"
 *             Category: ["TECH"]
 *             Question1: ["Insights e ideas alternativas","Developers junior calificados"]
 *             Question2: ["Identificar talento técnico y recursos de capital"]
 *     responses:
 *       201:
 *         description: Chat created successfully
 *       400:
 *         description: Bad request - Invalid data
 *       500:
 *         description: Internal server error
 */
ChatRouter.post("/new", async (req, res) => {
    try {
      await chatController.createChat(req, res);
    } catch (error) {
      res.status(500).json({
        message: "Unexpected error in chat route",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

export default ChatRouter;


