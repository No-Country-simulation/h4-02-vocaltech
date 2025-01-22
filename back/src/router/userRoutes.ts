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

export default UserRouter;



// import express from "express";
// import * as userController from "../controllers/userController";

// const router = express.Router();

// // Route to get a user by ID
// router.get("/:id", userController.getUserById);
// // Route to delete a user by ID
// router.delete("/:id", userController.deleteUser);

// export default router;
