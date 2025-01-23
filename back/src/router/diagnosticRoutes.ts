import { Router } from "express";
import { diagnosticController } from "../controllers/diagnosticController";

const DiagnosticRouter = Router();

// Route to get diagnostic by ID
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

export default DiagnosticRouter;

