import { Request, Response } from "express";
import { diagnosticService } from "../services/diagnosticService";
import Diagnostic, { DiagnosticFields } from "../models/Diagnostic";

export const diagnosticController = {
  async getDiagnosticById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const diagnostic = await diagnosticService.findDiagnosticById(id);

      if (!diagnostic) {
        return res.status(404).json({
          message: "Diagnostic not found",
        });
      }

      return res.status(200).json({
        message: "Diagnostic retrieved successfully",
        diagnostic,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unexpected error";
      console.error("Error fetching diagnostic by ID:", errorMessage);

      return res.status(500).json({
          message: "Failed to fetch diagnostic",
          error: errorMessage,
        });
    }
  },

  async deleteDiagnosticById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const deleted = await diagnosticService.deleteDiagnosticById(id);

      if (!deleted) {
        return res.status(404).json({
          message: "Diagnostic not found",
        });
      }

      return res.status(200).json({
        message: "Diagnostic deleted successfully",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unexpected error";
      console.error("Error deleting diagnostic:", errorMessage);

      return res.status(500).json({
        message: "Failed to delete diagnostic",
        error: errorMessage,
      });
    }
  },

  async editDiagnosticById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const diagnosticData = req.body;

      const updatedDiagnostic = await diagnosticService.updateDiagnosticById(id, diagnosticData);

      return res.status(200).json({
        message: "Diagnostic updated successfully",
        diagnostic: updatedDiagnostic,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unexpected error";
      console.error("Error updating diagnostic:", errorMessage);

      return res.status(500).json({
        message: "Failed to update diagnostic",
        error: errorMessage,
      });
    }
  },

  async patchDiagnosticById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const diagnosticData = req.body;
      const updatedDiagnostic = await diagnosticService.patchDiagnosticById(id, diagnosticData);
      return res.status(200).json({
        message: "Diagnostic patched successfully",
        diagnostic: updatedDiagnostic,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unexpected error";
      console.error("Error patching diagnostic:", errorMessage);
      return res.status(500).json({
        message: "Failed to patch diagnostic",
        error: errorMessage,
      });
    }
  },

  async createDiagnostic(req: Request, res: Response): Promise<Response> {
    try {
      const diagnosticData: DiagnosticFields = req.body;

      // Basic validation for required fields
      const requiredFields: (keyof DiagnosticFields)[] = [
        // "Type",
        // "idUser",
        // "idProduct"
      ];

      const missingFields = requiredFields.filter((field) => !diagnosticData[field]);
      if (missingFields.length > 0) {
        return res.status(400).json({
          message: `Missing required fields: ${missingFields.join(", ")}`,
        });
      }

      // Create new diagnostic in Airtable
      const newDiagnostic = await diagnosticService.createDiagnostic(diagnosticData);

      return res.status(201).json({
        message: "Diagnostic created successfully",
        diagnostic: newDiagnostic,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unexpected error";
      console.error("Error creating diagnostic:", errorMessage);

      return res.status(500).json({
        message: "Failed to create diagnostic",
        error: errorMessage,
      });
    }
  },

  async emailDiagnosticById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const diagnosticData = req.body;
      const updatedDiagnostic = await diagnosticService.emailDiagnosticById(id, diagnosticData);
      return res.status(200).json({
        message: "Diagnostic email sent successfully",
        diagnostic: updatedDiagnostic,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unexpected error";
      console.error("Error sending diagnostic email:", errorMessage);
      return res.status(500).json({
        message: "Failed to send diagnostic email",
        error: errorMessage,
      });
    }
  },  

};
