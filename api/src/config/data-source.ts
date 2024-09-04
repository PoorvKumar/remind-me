import { DataSource } from "typeorm";
import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

export const AppDataSource=new DataSource({
    type: 'mysql',
    host: process.env.INSTANCE_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME || 'dev',
    password: process.env.DB_PASS || 'root',
    database: process.env.DB_NAME || 'dev',
    synchronize: true,
    logging: false,
    entities: ['src/entity/**/*.ts'],
    migrations: [],
    subscribers: []
});