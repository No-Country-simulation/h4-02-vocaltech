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
    editUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const userData = req.body;
                const updatedUser = yield userService_1.userService.updateUserById(id, userData);
                return res.status(200).json({
                    message: "User updated successfully",
                    user: updatedUser,
                });
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Unexpected error";
                console.error("Error updating user:", errorMessage);
                return res.status(500).json({
                    message: "Failed to update user",
                    error: errorMessage,
                });
            }
        });
    },
    patchUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const userData = req.body;
                const updatedUser = yield userService_1.userService.patchUserById(id, userData);
                return res.status(200).json({
                    message: "User patched successfully",
                    user: updatedUser,
                });
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Unexpected error";
                console.error("Error patching user:", errorMessage);
                return res.status(500).json({
                    message: "Failed to patch user",
                    error: errorMessage,
                });
            }
        });
    },
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.body;
                // Basic validation for required fields
                const requiredFields = [
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
                const newUser = yield userService_1.userService.createUser(userData);
                return res.status(201).json({
                    message: "User created successfully",
                    user: newUser,
                });
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Unexpected error";
                console.error("Error creating user:", errorMessage);
                return res.status(500).json({
                    message: "Failed to create user",
                    error: errorMessage,
                });
            }
        });
    },
};
