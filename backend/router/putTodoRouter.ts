import { Router, Request, Response } from "express";
import { connection } from "../db/connection";

export const putTodoRouter = () => {
  const router = Router();
  router.put("/", (req: Request, res: Response) => {
    console.log("putリクエストを受け付けました。");
    console.log(req.body.data);
    const { id, todo } = req.body.data;
    const sql = `UPDATE todo SET todo="${todo}" WHERE id="${id}"`;
    connection.query(sql, (error) => {
      if (error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(200).json({ id, todo });
      }
    });
  });
  return router;
};
