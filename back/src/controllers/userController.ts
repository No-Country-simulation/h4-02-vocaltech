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




// import { Request, Response } from "express";
// import * as userService from "../services/userService";

// /**
//  * Controller to get a user by ID
//  * @param req - Express request object
//  * @param res - Express response object
//  * @returns Response
//  */
// export const getUserById = async (req: Request, res: Response): Promise<Response> => {
//     const { id } = req.params;
  
//     try {
//       const user = await userService.getUserById(id);
//       if (!user) {
//         return res.status(404).json({ message: `User with ID ${id} not found.` });
//       }
//       return res.status(200).json(user);
//     } catch (error) {
//       console.error(`Error in getUserById controller:`, (error as Error).message);
//       return res.status(500).json({ error: `Error fetching user: ${(error as Error).message}` });
//     }
//   };


// /**
//  * Controller to delete a user by ID
//  * @param req - Express request object
//  * @param res - Express response object
//  * @returns Response
//  */
// export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
//   const { id } = req.params;

//   try {
//     await userService.deleteUserById(id);
//     return res.status(200).json({ message: `User with ID ${id} successfully deleted.` });
//   } catch (error) {
//     console.error(`Error in deleteUser controller:`, error);
//     return res.status(500).json({ error: `Error deleting user: ${(error as Error).message}` });
//   }
// };

