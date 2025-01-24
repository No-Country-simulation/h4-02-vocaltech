"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const validateEnv_1 = require("./validateEnv");
// Configurar AWS SDK con las variables de entorno
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: validateEnv_1.config.AWS_ACCESS_KEY_ID,
    secretAccessKey: validateEnv_1.config.AWS_SECRET_ACCESS_KEY,
    region: validateEnv_1.config.AWS_REGION,
});
exports.default = s3;
