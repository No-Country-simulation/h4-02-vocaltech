import { Request, Response } from "express";
import { leadService } from "../services/leadService";
import Lead, { LeadFields } from "../models/Lead";

export const leadController = {
  async getLeadById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const lead = await leadService.findLeadById(id);

      if (!lead) {
        return res.status(404).json({
          message: "Lead not found",
        });
      }

      return res.status(200).json({
        message: "Lead retrieved successfully",
        lead,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unexpected error";
      console.error("Error fetching lead by ID:", errorMessage);

      return res.status(500).json({
        message: "Failed to fetch lead",
        error: errorMessage,
      });
    }
  },

  async deleteLeadById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const deleted = await leadService.deleteLeadById(id);

      if (!deleted) {
        return res.status(404).json({
          message: "Lead not found",
        });
      }

      return res.status(200).json({
        message: "Lead deleted successfully",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unexpected error";
      console.error("Error deleting lead:", errorMessage);

      return res.status(500).json({
        message: "Failed to delete lead",
        error: errorMessage,
      });
    }
  },

  async editLeadById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const leadData = req.body;

      const updatedLead = await leadService.updateLeadById(id, leadData);

      return res.status(200).json({
        message: "Lead updated successfully",
        lead: updatedLead,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unexpected error";
      console.error("Error updating lead:", errorMessage);

      return res.status(500).json({
        message: "Failed to update lead",
        error: errorMessage,
      });
    }
  },

  async patchLeadById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const leadData = req.body;

      const updatedLead = await leadService.patchLeadById(id, leadData);

      return res.status(200).json({
        message: "Lead patched successfully",
        lead: updatedLead,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unexpected error";
      console.error("Error patching lead:", errorMessage);

      return res.status(500).json({
        message: "Failed to patch lead",
        error: errorMessage,
      });
    }
  },

  async createLead(req: Request, res: Response): Promise<Response> {
    try {
      const leadData: LeadFields = req.body;

      // Basic validation for required fields
      const requiredFields: (keyof LeadFields)[] = [
        // "NameLead",
        // "Description",
        // "Category",
      ];

      const missingFields = requiredFields.filter((field) => !leadData[field]);
      if (missingFields.length > 0) {
        return res.status(400).json({
          message: `Missing required fields: ${missingFields.join(", ")}`,
        });
      }

      // Create new lead in Airtable
      const newLead = await leadService.createLead(leadData);

      return res.status(201).json({
        message: "Lead created successfully",
        lead: newLead,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unexpected error";
      console.error("Error creating lead:", errorMessage);

      return res.status(500).json({
        message: "Failed to create lead",
        error: errorMessage,
      });
    }
  },


};
