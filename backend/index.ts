import express, { Application } from "express";
import cors from "cors";

import { getTodoRouter } from "./router/getTodoRouter";
import { postTodoRouter } from "./router/postTodoRouter";
import { deleteTodoRouter } from "./router/deleteTodoRouter";
import { putTodoRouter } from "./router/putTodoRouter";

const app: Application = express();
const PORT = 3000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", getTodoRouter());
app.use("/add", postTodoRouter());
app.use("/delete", deleteTodoRouter());
app.use("/update", putTodoRouter());

try {
  app.listen(PORT, () => {
    console.log(`server running at://localhost:${PORT}`);
  });
} catch (e) {
  if (e instanceof Error) {
    console.error(e.message);
  }
}
