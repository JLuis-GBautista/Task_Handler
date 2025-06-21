import { drizzle } from "drizzle-orm/mysql2";
import * as publicSchema from "./schemas/public";
import mysql from "mysql2/promise";
import ENV from "../config/env";

const schema = { ...publicSchema };

const pool = mysql.createPool({
  host: ENV.MYSQL_HOST,
  user: ENV.MYSQL_USER,
  password: ENV.MYSQL_PASSWORD,
  database: ENV.MYSQL_DATABASE,
});

export const db = drizzle(pool, { schema, mode: 'default' });

// db.query.users.findMany({
//   columns: {
  
//   },
//   extras: {
//     //age
//   }
//   })