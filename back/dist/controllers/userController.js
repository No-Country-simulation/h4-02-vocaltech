"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const userService_1 = require("../services/userService");
exports.userController = {
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield userService_1.userService.findUserById(id);
                if (!user) {
                    return res.status(404).json({
                        message: "User not found",
                    });
                }
                return res.status(200).json({
                    message: "User retrieved successfully",
                    user,
                });
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Unexpected error";
                console.error("Error fetching user by ID:", errorMessage);
                return res.status(500).json({
                    message: "Failed to fetch user",
                    error: errorMessage,
                });
            }
        });
    },
    deleteUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deleted = yield userService_1.userService.deleteUserById(id);
                if (!deleted) {
                    return res.status(404).json({
                        message: "User not found",
                    });
                }
                return res.status(200).json({
                    message: "User deleted successfully",
                });
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Unexpected error";
                console.error("Error deleting user:", errorMessage);
                return res.status(500).json({
                    message: "Failed to delete user",
                    error: errorMessage,
                });
            }
        });
    },
};
// import { Request, Response } from "express";
// import { userService } from "../services/userService";
// export const userController = {
//   async getUserById(req: Request, res: Response): Promise<Response> {
//     try {
//       const { id } = req.params;
//       const user = await userService.findUserById(id);
//       if (!user) {
//         return res.status(404).json({
//           message: "User not found",
//         });
//       }
//       return res.status(200).json({
//         message: "User retrieved successfully",
//         user,
//       });
//     } catch (error) {
//       const errorMessage =
//         error instanceof Error ? error.message : "Unexpected error";
//       console.error("Error fetching user by ID:", errorMessage);
//       return res.status(500).json({
//         message: "Failed to fetch user",
//         error: errorMessage,
//       });
//     }
//   },
// };
