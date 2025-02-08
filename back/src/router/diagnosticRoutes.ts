import { Router } from "express";
import { diagnosticController } from "../controllers/diagnosticController";

const DiagnosticRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Diagnostics
 *   description: API for diagnostic management
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

// Route to get diagnostic by ID
/**
 * @swagger
 * /api/diagnostics/{id}:
 *   get:
 *     summary: Get a diagnostic by ID
 *     tags: [Diagnostics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the diagnostic to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved diagnostic
 *       404:
 *         description: Diagnostic not found
 *       500:
 *         description: Internal server error
 */
DiagnosticRouter.get("/:id", async (req, res) => {
  try {
    await diagnosticController.getDiagnosticById(req, res);
  } catch (error) {
    res.status(500).json({
      message: "Unexpected error in diagnostic route",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Route to delete diagnostic by ID
/**
 * @swagger
 * /api/diagnostics/{id}:
 *   delete:
 *     summary: Delete a diagnostic by ID
 *     tags: [Diagnostics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the diagnostic to delete
 *     responses:
 *       200:
 *         description: Diagnostic deleted successfully
 *       404:
 *         description: Diagnostic not found
 *       500:
 *         description: Internal server error
 */
DiagnosticRouter.delete("/:id", async (req, res) => {
  try {
    await diagnosticController.deleteDiagnosticById(req, res);
  } catch (error) {
    res.status(500).json({
      message: "Unexpected error in diagnostic route",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Route to edit diagnostic by ID
/**
 * @swagger
 * /api/diagnostics/{id}:
 *   put:
 *     summary: Update diagnostic details by ID
 *     tags: [Diagnostics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the diagnostic to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *           example:
 *             Type: "EMPRESA"
 *             idUser: ["recrrbo7S0RmI0dy9"]
 *             idProduct: ["rec0PnF24uiS7REmy","recMFt1jIenek2lKv"]
 *             Diagnostic: "string"
 *             InfoFile: "string"
 *             SoundFile: "string"
 *             DescripCorp: "description of Acme Corp."
 *             SelectArea: "string"
 *             Status: "TO DO"
 *             Question1: "Question1 response 1"
 *             Question2: "Question2 response 2"
 *             Question3: "Question3 response 3"
 *             Question4: "Question4 response 4"
 *             Question5: "Question5 response 5"
 *     responses:
 *       200:
 *         description: Diagnostic updated successfully
 *       400:
 *         description: Bad request - Invalid data
 *       404:
 *         description: Diagnostic not found
 *       500:
 *         description: Internal server error
 */
DiagnosticRouter.put("/:id", async (req, res) => {
    try {
      await diagnosticController.editDiagnosticById(req, res);
    } catch (error) {
      res.status(500).json({
        message: "Unexpected error in diagnostic route",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

// Route to patch diagnostic by ID (partial update)
/**
 * @swagger
 * /api/diagnostics/{id}:
 *   patch:
 *     summary: Partially update a diagnostic by ID
 *     tags: [Diagnostics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the diagnostic to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *           example:
 *             Type: "EMPRESA"
 *             idUser: ["recrrbo7S0RmI0dy9"]
 *             idProduct: ["rec0PnF24uiS7REmy","recMFt1jIenek2lKv"]
 *             Diagnostic: "string"
 *             InfoFile: "string"
 *             SoundFile: "string"
 *             DescripCorp: "description of Acme Corp."
 *             SelectArea: "string"
 *             Status: "TO DO"
 *             Question1: "Question1 response 1"
 *             Question2: "Question2 response 2"
 *             Question3: "Question3 response 3"
 *             Question4: "Question4 response 4"
 *             Question5: "Question5 response 5"
 *     responses:
 *       200:
 *         description: Diagnostic updated successfully
 *       400:
 *         description: Bad request - Invalid data
 *       404:
 *         description: Diagnostic not found
 *       500:
 *         description: Internal server error
 */
DiagnosticRouter.patch("/:id", async (req, res) => {
    try {
      await diagnosticController.patchDiagnosticById(req, res);
    } catch (error) {
      res.status(500).json({
        message: "Unexpected error in diagnostic route",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

// Route to create a new diagnostic
/**
 * @swagger
 * /api/diagnostics/new:
 *   post:
 *     summary: Create a new diagnostic
 *     tags: [Diagnostics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *           example:
 *             Type: "EMPRESA"
 *             idUser: ["recrrbo7S0RmI0dy9"]
 *             idProduct: ["rec0PnF24uiS7REmy","recMFt1jIenek2lKv"]
 *             Diagnostic: "string"
 *             InfoFile: "string"
 *             SoundFile: "string"
 *             DescripCorp: "description of Acme Corp."
 *             SelectArea: "string"
 *             Status: "TO DO"
 *             Question1: "Question1 response 1"
 *             Question2: "Question2 response 2"
 *             Question3: "Question3 response 3"
 *             Question4: "Question4 response 4"
 *             Question5: "Question5 response 5"
 *     responses:
 *       201:
 *         description: Diagnostic created successfully
 *       400:
 *         description: Bad request - Invalid data
 *       500:
 *         description: Internal server error
 */
DiagnosticRouter.post("/new", async (req, res) => {
    try {
      await diagnosticController.createDiagnostic(req, res);
    } catch (error) {
      res.status(500).json({
        message: "Unexpected error in diagnostic route",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

// Route to patch diagnostic by ID (partial update)
/**
 * @swagger
 * /api/diagnostics/email/{id}:
 *   patch:
 *     summary: Partially update a diagnostic by ID
 *     tags: [Diagnostics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the diagnostic to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *           example:
 *             Type: "EMPRESA"
 *             idUser: ["recrrbo7S0RmI0dy9"]
 *             idProduct: ["rec0PnF24uiS7REmy","recMFt1jIenek2lKv"]
 *             Diagnostic: "string"
 *             InfoFile: "string"
 *             SoundFile: "string"
 *             DescripCorp: "description of Acme Corp."
 *             SelectArea: "string"
 *             Status: "TO DO"
 *             Question1: "Question1 response 1"
 *             Question2: "Question2 response 2"
 *             Question3: "Question3 response 3"
 *             Question4: "Question4 response 4"
 *             Question5: "Question5 response 5"
 *     responses:
 *       200:
 *         description: Diagnostic updated successfully
 *       400:
 *         description: Bad request - Invalid data
 *       404:
 *         description: Diagnostic not found
 *       500:
 *         description: Internal server error
 */
DiagnosticRouter.patch("/email/:id", async (req, res) => {
    try {
      await diagnosticController.emailDiagnosticById(req, res);
    } catch (error) {
      res.status(500).json({
        message: "Unexpected error in diagnostic route",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });
  
export default DiagnosticRouter;

