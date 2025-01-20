"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AirTableController_1 = require("../config/AirTableController");
const router = (0, express_1.Router)();
// Ruta para obtener registros de una tabla específica en AirTable
router.get("/:table", AirTableController_1.getTableRecords);
exports.default = router;
