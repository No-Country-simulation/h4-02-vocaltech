import { Request, Response, Router } from 'express';
import { uploadFileToS3 } from '../controllers/fileController';
import { upload } from '../utils/fileUpload';

const fileRouter = Router();

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




