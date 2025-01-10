import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from '../entity/User';

dotenv.config();

export const dataSource = new DataSource({
    type: 'postgres',
    host: 'postgres-whatsapp',
    port: 5432,
    username: process.env.POSTGRES_USER_WHATSAPP,
    password: process.env.POSTGRES_PASSWORD_WHATSAPP,
    database: process.env.POSTGRES_DB_WHATSAPP,
    synchronize: true,
    logging: true,
    entities: [User],  
});
  