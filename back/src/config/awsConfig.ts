import AWS from 'aws-sdk';
import { config } from './validateEnv';

// Configurar AWS SDK con las variables de entorno
const s3 = new AWS.S3({
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  region: config.AWS_REGION,
});

export default s3;
