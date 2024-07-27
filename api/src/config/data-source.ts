import { DataSource } from "typeorm";
import "reflect-metadata";

export const AppDataSource=new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'dev',
    password: 'root',
    database: 'dev',
    synchronize: true,
    logging: false,
    entities: ['src/entity/**/*.ts'],
    migrations: [],
    subscribers: []
});