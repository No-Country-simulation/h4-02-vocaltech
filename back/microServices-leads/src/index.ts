import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const dataSource = new DataSource({
    type: 'postgres',
    host: 'postgres',
    port: 5432,
    username: process.env.POSTGRES_USER_LEADS,
    password: process.env.POSTGRES_PASSWORD_LEADS,
    database: process.env.POSTGRES_DB_LEADS,
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