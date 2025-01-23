"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RouterAirTable_1 = __importDefault(require("../router/RouterAirTable"));
const authRoutes_1 = __importDefault(require("./authRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const router = (0, express_1.Router)();
// Rutas para AirTable
router.use("/airtable", RouterAirTable_1.default);
router.use("/auth", authRoutes_1.default);
router.use("/user", userRoutes_1.default);
/*
router.use("/leads", ledsRoutes);
router.use("/diagnostics",);
router.use("/notifications");
router.use("/admin",);
*/
exports.default = router;
