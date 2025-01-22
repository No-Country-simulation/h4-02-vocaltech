"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileToS3 = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const awsConfig_1 = __importDefault(require("../config/awsConfig"));
const validateEnv_1 = require("../config/validateEnv");
// Tipos MIME permitidos
const allowedTypes = [
    'application/pdf', // PDF
    'image/jpeg', // JPG
    'image/png', // PNG
    'audio/mpeg', // MP3
    'audio/wav', // WAV
    'application/vnd.ms-excel', // Excel (.xls)
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Excel (.xlsx)
    'application/vnd.ms-powerpoint', // PowerPoint (.ppt)
    'application/vnd.openxmlformats-officedocument.presentationml.presentation' // PowerPoint (.pptx)
];
// Configuración de Multer para almacenar los archivos en memoria y validación del tipo de archivo
const storage = multer_1.default.memoryStorage();
const fileFilter = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Aceptar el archivo
    }
    else {
        cb(new Error('Tipo de archivo no permitido'), false); // Rechazar el archivo
    }
};
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter // Añadir validación de tipos
});
exports.upload = upload;
// Función para manejar la carga de archivos a S3
const uploadFileToS3 = (file) => {
    const params = {
        Bucket: validateEnv_1.config.AWS_BUCKET_NAME,
        Key: `uploads/${Date.now()}_${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
    };
    return new Promise((resolve, reject) => {
        awsConfig_1.default.upload(params, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
};
exports.uploadFileToS3 = uploadFileToS3;
