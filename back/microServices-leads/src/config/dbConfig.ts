import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from '../entity/User';

dotenv.config();

export const dataSource = new DataSource({
    type: 'postgres',
    host: 'postgres-leads',
    port: 5432,
    username: process.env.POSTGRES_USER_LEADS,
    password: process.env.POSTGRES_PASSWORD_LEADS,
    database: process.env.POSTGRES_DB_LEADS,
    synchronize: true,
    logging: true,
    entities: [User],  
});
  