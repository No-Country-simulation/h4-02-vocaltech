import { Router } from "express";
import { userController } from "../controllers/userController";

const UserRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for user management
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

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved user
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
UserRouter.get("/:id", async (req, res) => {
  try {
    await userController.getUserById(req, res);
  } catch (error) {
    handleRouteError(res, error);
  }
});

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
UserRouter.delete("/:id", async (req, res) => {
  try {
    await userController.deleteUserById(req, res);
  } catch (error) {
    handleRouteError(res, error);
  }
});

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     summary: Update user details by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *             example:
 *               name: "test01"
 *               phone: "+1234567890"
 *               email: "test01@example.com"
 *               role: "USER"
 *               company: "Example Corp."
 *               password: "$2a$10$82KIrqUg/5HdX/uGie7HAuHu21URhZfSuzx0.Ek5y8GzufbY1YWbC"
 *               description: "Example description"
 *               status: "ACTIVO"
 *               active: true
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request - Invalid data
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
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


/**
 * @swagger
 * /api/user/{id}:
 *   patch:
 *     summary: Partially update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *             example:
 *               name: "test01"
 *               phone: "+1234567890"
 *               email: "test01@example.com"
 *               role: "USER"
 *               company: "Example Corp."
 *               password: "$2a$10$82KIrqUg/5HdX/uGie7HAuHu21URhZfSuzx0.Ek5y8GzufbY1YWbC"
 *               description: "Example description"
 *               status: "ACTIVO"
 *               active: true
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request - Invalid data
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
UserRouter.patch("/:id", async (req, res) => {
  try {
    await userController.patchUserById(req, res);
  } catch (error) {
    handleRouteError(res, error);
  }
});

/**
 * @swagger
 * /api/user/new:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *             example:
 *               name: "test01"
 *               phone: "+1234567890"
 *               email: "test01@example.com"
 *               role: "USER"
 *               company: "Example Corp."
 *               password: "$2a$10$82KIrqUg/5HdX/uGie7HAuHu21URhZfSuzx0.Ek5y8GzufbY1YWbC"
 *               description: "Example description"
 *               status: "ACTIVO"
 *               active: true
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request - Invalid data
 *       500:
 *         description: Internal server error
 */
UserRouter.post("/new", async (req, res) => {
  try {
    await userController.createUser(req, res);
  } catch (error) {
    handleRouteError(res, error);
  }
});

export default UserRouter;

//******************* version swagger conf test ok. ******* */
// import { Router } from "express";
// import { userController } from "../controllers/userController";

// const UserRouter = Router();

// // Route to get user by ID
// /**
//  * @swagger
//  * tags:
//  *   name: Users
//  *   description: User management API
//  */
// /**
//  * @swagger
//  * /api/user/{id}:
//  *   get:
//  *     summary: Get a user by ID
//  *     tags: [Users]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: User ID
//  *     responses:
//  *       200:
//  *         description: User found
//  *       404:
//  *         description: User not found
//  */
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

// // Route to delete user by ID
// UserRouter.delete("/:id", async (req, res) => {
//   try {
//     await userController.deleteUserById(req, res);
//   } catch (error) {
//     res.status(500).json({
//       message: "Unexpected error in user route",
//       error: error instanceof Error ? error.message : "Unknown error",
//     });
//   }
// });

// // Route to edit user by ID
// UserRouter.put("/:id", async (req, res) => {
//     try {
//       await userController.editUserById(req, res);
//     } catch (error) {
//       res.status(500).json({
//         message: "Unexpected error in user route",
//         error: error instanceof Error ? error.message : "Unknown error",
//       });
//     }
//   });

// // Route to patch user by ID (partial update)
// UserRouter.patch("/:id", async (req, res) => {
//     try {
//       await userController.patchUserById(req, res);
//     } catch (error) {
//       res.status(500).json({
//         message: "Unexpected error in user route",
//         error: error instanceof Error ? error.message : "Unknown error",
//       });
//     }
//   });

// // Route to create a new user
// UserRouter.post("/new", async (req, res) => {
//     try {
//       await userController.createUser(req, res);
//     } catch (error) {
//       res.status(500).json({
//         message: "Unexpected error in user route",
//         error: error instanceof Error ? error.message : "Unknown error",
//       });
//     }
//   });

// export default UserRouter;

