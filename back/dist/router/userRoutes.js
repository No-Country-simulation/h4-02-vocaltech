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
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const UserRouter = (0, express_1.Router)();
// Route to get user by ID
UserRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userController_1.userController.getUserById(req, res);
    }
    catch (error) {
        res.status(500).json({
            message: "Unexpected error in user route",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}));
// Route to delete user by ID
UserRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userController_1.userController.deleteUserById(req, res);
    }
    catch (error) {
        res.status(500).json({
            message: "Unexpected error in user route",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}));
exports.default = UserRouter;
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
