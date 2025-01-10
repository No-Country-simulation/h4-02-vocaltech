import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export const dataSource = new DataSource({
    type: 'postgres',
    host: 'postgres-email',
    port: 5432,
    username: process.env.POSTGRES_USER_EMAIL,
    password: process.env.POSTGRES_PASSWORD_EMAIL,
    database: process.env.POSTGRES_DB_EMAIL,
    synchronize: true,
    logging: true,
    entities: [],  
});
  