import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config()

export const connection = mysql.createConnection({
    host: "localhost",
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: "todos_test",
  });
  