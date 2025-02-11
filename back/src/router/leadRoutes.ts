import { Router } from "express";
import { leadController } from "../controllers/leadController";

const LeadRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Leads
 *   description: API for lead management
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

// Route to get lead by ID
/**
 * @swagger
 * /api/leads/{id}:
 *   get:
 *     summary: Get a lead by ID
 *     tags: [Leads]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the lead to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved lead
 *       404:
 *         description: Lead not found
 *       500:
 *         description: Internal server error
 */
LeadRouter.get("/:id", async (req, res) => {
  try {
    await leadController.getLeadById(req, res);
  } catch (error) {
    res.status(500).json({
      message: "Unexpected error in lead route",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Route to delete lead by ID
/**
 * @swagger
 * /api/leads/{id}:
 *   delete:
 *     summary: Delete a lead by ID
 *     tags: [Leads]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the lead to delete
 *     responses:
 *       200:
 *         description: Lead deleted successfully
 *       404:
 *         description: Lead not found
 *       500:
 *         description: Internal server error
 */
LeadRouter.delete("/:id", async (req, res) => {
  try {
    await leadController.deleteLeadById(req, res);
  } catch (error) {
    res.status(500).json({
      message: "Unexpected error in lead route",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Route to edit lead by ID
/**
 * @swagger
 * /api/leads/{id}:
 *   put:
 *     summary: Update lead details by ID
 *     tags: [Leads]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the lead to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *           example:
 *             Lead: "Lead  text"
 *             Status: "Todo"
 *             Notes: "Notes lead"
 *             LastContact: "Last contact lead"
 *             idDiagnostic: ["reckdN6uvR9ZijJHd"]
 *             idUser: ["rec75d7hStDRNVGmc"]
 *             Partner: "Partner name"
 *     responses:
 *       200:
 *         description: Lead updated successfully
 *       400:
 *         description: Bad request - Invalid data
 *       404:
 *         description: Lead not found
 *       500:
 *         description: Internal server error
 */
LeadRouter.put("/:id", async (req, res) => {
    try {
      await leadController.editLeadById(req, res);
    } catch (error) {
      res.status(500).json({
        message: "Unexpected error in lead route",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

// Route to patch lead by ID (partial update)
/**
 * @swagger
 * /api/leads/{id}:
 *   patch:
 *     summary: Partially update a lead by ID
 *     tags: [Leads]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the lead to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *           example:
 *             Lead: "Lead  text"
 *             Status: "Todo"
 *             Notes: "Notes lead"
 *             LastContact: "Last contact lead"
 *             idDiagnostic: ["reckdN6uvR9ZijJHd"]
 *             idUser: ["rec75d7hStDRNVGmc"]
 *             Partner: "Partner name"
 *     responses:
 *       200:
 *         description: Lead updated successfully
 *       400:
 *         description: Bad request - Invalid data
 *       404:
 *         description: Lead not found
 *       500:
 *         description: Internal server error
 */
LeadRouter.patch("/:id", async (req, res) => {
    try {
      await leadController.patchLeadById(req, res);
    } catch (error) {
      res.status(500).json({
        message: "Unexpected error in lead route",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

// Route to create a new lead
/**
 * @swagger
 * /api/leads/new:
 *   post:
 *     summary: Create a new lead
 *     tags: [Leads]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *           example:
 *             Lead: "Lead  text"
 *             Status: "Todo"
 *             Notes: "Notes lead"
 *             LastContact: "Last contact lead"
 *             idDiagnostic: ["reckdN6uvR9ZijJHd"]
 *             idUser: ["rec75d7hStDRNVGmc"]
 *             Partner: "Partner name"
 *     responses:
 *       201:
 *         description: Lead created successfully
 *       400:
 *         description: Bad request - Invalid data
 *       500:
 *         description: Internal server error
 */
LeadRouter.post("/new", async (req, res) => {
    try {
      await leadController.createLead(req, res);
    } catch (error) {
      res.status(500).json({
        message: "Unexpected error in lead route",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

export default LeadRouter;

