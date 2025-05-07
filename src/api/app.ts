import express from "express";
import { DatabaseManager } from "../persistence/dbmanager";
import authorRouter from "./routes/authorroutes";

const app = express();

DatabaseManager.initialize({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT as unknown as number,
});

const PORT = process.env.PORT;
app.use(express.json());
app.use("/api/authors", authorRouter);

app.get("/", (request, response) => {
  console.log(response);
  response.status(200).send("Hello World");
});

export default app;
