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
const fileController_1 = require("../controllers/fileController");
const fileUpload_1 = require("../utils/fileUpload");
const fileRouter = (0, express_1.Router)();
fileRouter.post('/upload', fileUpload_1.upload.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        res.status(400).json({ message: 'No se ha cargado ningún archivo' });
        return;
    }
    try {
        const data = yield (0, fileController_1.uploadFileToS3)(req.file);
        res.status(200).json({ message: 'Archivo subido correctamente', data });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al cargar el archivo', error });
    }
}));
exports.default = fileRouter;
