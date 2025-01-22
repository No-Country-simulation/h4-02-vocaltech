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

export default UserRouter;



// import { Router } from "express";
// import { userController } from "../controllers/userController";

// const UserRouter = Router();

// // Route to get user by ID
// UserRouter.get("/:id", async (req, res) => {
//   try {
//     await userController.getUserById(req, res);
//   } catch (error) {
//     res.status(500).json({
//       message: "Unexpected error in user route",
//       error: error instanceof Error ? error.message : "Unknown error",
//     });
//   }
// });

// export default UserRouter;


