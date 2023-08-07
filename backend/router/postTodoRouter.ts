import { Router, Request, Response } from "express";
import { connection } from "../db/connection";
import { uid } from "uid";

export const postTodoRouter = () => {
  const router = Router();
  router.post("/", (req: Request, res: Response) => {
    console.log("postリクエストを受け付けました。");
    const { todo } = req.body.data;
    const uidValue = uid();
    const sql = `INSERT INTO todo VALUES ("${uidValue}", "${todo}")`;
    connection.query(sql, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to add todo" });
      }
      return res.status(200).json({ id: uidValue, todo });
    });
  });
  return router;
};
