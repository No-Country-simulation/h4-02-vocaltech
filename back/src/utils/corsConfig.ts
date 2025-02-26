import { CorsOptions } from "cors";

const allowedOrigins = [
    'http://localhost:3001',
    'http://localhost:3000',
    'https://h4-02-vocaltech.onrender.com',
    'https://h4-02-vocaltech.vercel.app',
    'http://localhost:5173'
];

const corsConfig: CorsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Permitir acceso
        } else {
            callback(new Error('Origen no permitido por CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

export default corsConfig;