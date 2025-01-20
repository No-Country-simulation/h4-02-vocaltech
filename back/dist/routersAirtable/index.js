"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RouterAirTable_1 = __importDefault(require("./RouterAirTable"));
const router = (0, express_1.Router)();
// Rutas para AirTable
router.use("/airtable", RouterAirTable_1.default);
exports.default = router;
