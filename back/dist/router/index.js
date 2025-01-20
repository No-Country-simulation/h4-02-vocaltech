"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RouterAirTable_1 = __importDefault(require("../router/RouterAirTable"));
const router = (0, express_1.Router)();
// Rutas para AirTable
router.use("/airtable", RouterAirTable_1.default);
/*
router.use("/auth",);
router.use("/leads",);
router.use("/diagnostics",);
router.use("/notifications");
router.use("/admin",);
*/
exports.default = router;
