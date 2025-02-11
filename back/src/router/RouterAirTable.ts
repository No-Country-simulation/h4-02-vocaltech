import { Router } from "express";
import { getTableRecords } from "../config/AirTableController";

const router = Router();

// Ruta para obtener registros de una tabla específica en AirTable
/**
 * @swagger
 * tags:
 *   name: Airtable Management
 *   description: API for managing Airtable records
 */

/**
 * @swagger
 * /api/airtable/{table}:
 *   get:
 *     summary: Fetch all records from a specified Airtable table
 *     tags: [Airtable Management]
 *     parameters:
 *       - in: path
 *         name: table
 *         required: true
 *         description: Name of the Airtable table to fetch records from
 *         schema:
 *           type: string
 *           enum: [Users, Leads, Diagnostics, Products, Contacts, Interactions, Chats]
 *     responses:
 *       200:
 *         description: Successfully fetched records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "recA1B2C3D4E5F6G7"
 *                   fields:
 *                     type: object
 *                     additionalProperties: true
 *                     example: { "Name": "John Doe", "Email": "john@example.com" }
 *       400:
 *         description: Invalid table name or request error
 *       500:
 *         description: Server error while fetching records
 */
router.get("/:table", getTableRecords);

export default router;
