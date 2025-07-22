import mysql from 'mysql2/promise'
import { drizzle } from 'drizzle-orm/mysql2'
import dotenv from 'dotenv';

dotenv.config()

let pool;
let db;

pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME, 
});

db = drizzle(pool);

export {db, pool};