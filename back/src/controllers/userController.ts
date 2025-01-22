import { Request, Response } from "express";
import { userService } from "../services/userService";
import User, { UserFields } from "../models/User";

export const userController = {
  async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const user = await userService.findUserById(id);

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      return res.status(200).json({
        message: "User retrieved successfully",
        user,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unexpected error";
      console.error("Error fetching user by ID:", errorMessage);

      return res.status(500).json({
        message: "Failed to fetch user",
        error: errorMessage,
      });
    }
  },

  async deleteUserById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const deleted = await userService.deleteUserById(id);

      if (!deleted) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      return res.status(200).json({
        message: "User deleted successfully",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unexpected error";
      console.error("Error deleting user:", errorMessage);

      return res.status(500).json({
        message: "Failed to delete user",
        error: errorMessage,
      });
    }
  },

  async editUserById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const userData = req.body;

      const updatedUser = await userService.updateUserById(id, userData);

      return res.status(200).json({
        message: "User updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unexpected error";
      console.error("Error updating user:", errorMessage);

      return res.status(500).json({
        message: "Failed to update user",
        error: errorMessage,
      });
    }
  },

  async patchUserById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const userData = req.body;

      const updatedUser = await userService.patchUserById(id, userData);

      return res.status(200).json({
        message: "User patched successfully",
        user: updatedUser,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unexpected error";
      console.error("Error patching user:", errorMessage);

      return res.status(500).json({
        message: "Failed to patch user",
        error: errorMessage,
      });
    }
  },

  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const userData: UserFields = req.body;

      // Basic validation for required fields
      const requiredFields: (keyof UserFields)[] = [
        "name",
        "phone",
        "email"
      ];

      const missingFields = requiredFields.filter((field) => !userData[field]);
      if (missingFields.length > 0) {
        return res.status(400).json({
          message: `Missing required fields: ${missingFields.join(", ")}`,
        });
      }

      // Create new user in Airtable
      const newUser = await userService.createUser(userData);

      return res.status(201).json({
        message: "User created successfully",
        user: newUser,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unexpected error";
      console.error("Error creating user:", errorMessage);

      return res.status(500).json({
        message: "Failed to create user",
        error: errorMessage,
      });
    }
  },


};
