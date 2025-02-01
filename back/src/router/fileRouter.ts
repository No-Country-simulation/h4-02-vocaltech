import { Request, Response, Router } from 'express';
import { uploadFileToS3 } from '../controllers/fileController';
import { upload } from '../utils/fileUpload';

const fileRouter = Router();

/**
 * Error handling middleware for async routes
 */
const handleRouteError = (res: any, error: unknown) => {
    res.status(500).json({
      message: "Unexpected error in user route",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  };

/**
 * @swagger
 * /file/upload:
 *   post:
 *     summary: Upload a file to S3
 *     tags: [Files]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: File to upload (PDF, JPG, PNG, MP3, WAV, Excel, PowerPoint)
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   description: Details of the uploaded file
 *       400:
 *         description: No file uploaded or invalid file type
 *       500:
 *         description: Server error while uploading the file
 */
fileRouter.post('/upload', upload.single('file'), async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ message: 'No se ha cargado ningún archivo' });
    return;
  }

  try {
    const data = await uploadFileToS3(req.file);
    res.status(200).json({ message: 'Archivo subido correctamente', data });
  } catch (error) {
    res.status(500).json({ message: 'Error al cargar el archivo', error });
  }
});

export default fileRouter;




