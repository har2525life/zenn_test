import { Router, Request, Response } from "express";
import { connection } from "../db/connection";

export const getTodoRouter = () => {
  const router = Router();
  router.get("/", (req: Request, res: Response) => {
    console.log("getリクエストを受け付けました。");
    const sql = "SELECT * FROM todo";
    connection.query(sql, (error, result) => {
      if (error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(200).json({ todos: result });
      }
    });
  });
  return router;
};
