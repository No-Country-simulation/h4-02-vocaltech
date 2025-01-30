import { Router } from "express";
import { leadController } from "../controllers/leadController";

const LeadRouter = Router();

// Route to get lead by ID
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

