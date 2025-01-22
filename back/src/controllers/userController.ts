import { Request, Response } from "express";
import { userService } from "../services/userService";

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
};

