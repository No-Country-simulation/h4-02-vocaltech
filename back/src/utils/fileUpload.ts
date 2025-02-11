import AWS from 'aws-sdk';
import multer from 'multer';
import s3 from '../config/awsConfig';
import { config } from '../config/validateEnv';

// Tipos MIME permitidos
const allowedTypes = [
  'application/pdf',      // PDF
  'image/jpeg',           // JPG
  'audio/webp',           // WEBP
  'audio/acc',            // 
  'audio/amr',            //
  'image/png',            // PNG
  'audio/mpeg',           // MP3
  'audio/m4a',            // MP4
  'audio/wav',            // WAV
  'audio/ogg',            // AGREGADO: WhatsApp voz (.opus)
  'application/vnd.ms-excel',  // Excel (.xls)
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Excel (.xlsx)
  'application/vnd.ms-powerpoint',  // PowerPoint (.ppt)
  'application/vnd.openxmlformats-officedocument.presentationml.presentation'  // PowerPoint (.pptx)
];

// Configuración de Multer para almacenar los archivos en memoria y validación del tipo de archivo
const storage = multer.memoryStorage();

const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);  // Aceptar el archivo
  } else {
    cb(new Error('Tipo de archivo no permitido'), false);  // Rechazar el archivo
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter  // Añadir validación de tipos
});

// Función para manejar la carga de archivos a S3
const uploadFileToS3 = (file: Express.Multer.File): Promise<AWS.S3.ManagedUpload.SendData> => {
  const params: AWS.S3.PutObjectRequest = {
    Bucket: config.AWS_BUCKET_NAME!,
    Key: `uploads/${Date.now()}_${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (err: Error | null, data: AWS.S3.ManagedUpload.SendData) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

export { upload, uploadFileToS3 };


