import AWS from "aws-sdk";
import multer from "multer";
import s3 from "../config/awsConfig";
import { config } from "../config/validateEnv";

// Tipos MIME permitidos
const allowedTypes = [
  "audio/webp",
  "audio/aac",
  "audio/amr",
  "audio/mpeg", // MP3
  "audio/m4a",
  "audio/wav",
  "audio/ogg",
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];

// Configuración de Multer para almacenar en memoria
const storage = multer.memoryStorage();

const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  console.log(`📂 Recibiendo archivo: ${file.originalname} (${file.mimetype})`);

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    console.warn(`❌ Tipo de archivo no permitido: ${file.mimetype}`);
    cb(new Error("Tipo de archivo no permitido"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

// Función para subir el archivo a AWS S3
const uploadFileToS3 = (file: Express.Multer.File): Promise<AWS.S3.ManagedUpload.SendData> => {
  const fileKey = `uploads/${Date.now()}_${file.originalname}`;

  const params: AWS.S3.PutObjectRequest = {
    Bucket: config.AWS_BUCKET_NAME!,
    Key: fileKey,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  console.log(`🚀 Subiendo archivo a S3: ${fileKey}`);

  return new Promise((resolve, reject) => {
    s3.upload(params, (err: Error | null, data: AWS.S3.ManagedUpload.SendData) => {
      if (err) {
        console.error("❌ Error al subir el archivo:", err);
        reject(err);
      } else {
        console.log("✅ Archivo subido con éxito:", data.Location);
        resolve(data);
      }
    });
  });
};

export { upload, uploadFileToS3 };


