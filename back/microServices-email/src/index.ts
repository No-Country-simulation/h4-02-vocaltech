import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const dataSource = new DataSource({
    type: 'postgres',
    host: 'postgres',
    port: 5432,
    username: process.env.POSTGRES_USER_EMAIL,
    password: process.env.POSTGRES_PASSWORD_EMAIL,
    database: process.env.POSTGRES_DB_EMAIL,
    synchronize: true,
    logging: true,
    entities: [],  
  });
  
dataSource.initialize()
    .then(() => {
      console.log('Connected to Leads PostgreSQL database');
    })
    .catch((error) => {
      console.error('Error during connection', error);
    });