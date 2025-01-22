import { Router } from "express";
import { userController } from "../controllers/userController";

const UserRouter = Router();

// Route to get user by ID
UserRouter.get("/:id", async (req, res) => {
  try {
    await userController.getUserById(req, res);
  } catch (error) {
    res.status(500).json({
      message: "Unexpected error in user route",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Route to delete user by ID
UserRouter.delete("/:id", async (req, res) => {
  try {
    await userController.deleteUserById(req, res);
  } catch (error) {
    res.status(500).json({
      message: "Unexpected error in user route",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Route to edit user by ID
UserRouter.put("/:id", async (req, res) => {
    try {
      await userController.editUserById(req, res);
    } catch (error) {
      res.status(500).json({
        message: "Unexpected error in user route",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

// Route to patch user by ID (partial update)
UserRouter.patch("/:id", async (req, res) => {
    try {
      await userController.patchUserById(req, res);
    } catch (error) {
      res.status(500).json({
        message: "Unexpected error in user route",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

// Route to create a new user
UserRouter.post("/new", async (req, res) => {
    try {
      await userController.createUser(req, res);
    } catch (error) {
      res.status(500).json({
        message: "Unexpected error in user route",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

export default UserRouter;

