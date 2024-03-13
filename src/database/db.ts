import "dotenv/config"
import { drizzle } from 'drizzle-orm/mysql2';
import * as mysql from 'mysql2/promise';

export const connection = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  multipleStatements: true,
})

export const db = drizzle(connection);
