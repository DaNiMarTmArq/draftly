import express, { ErrorRequestHandler, NextFunction } from "express";
import { DatabaseManager } from "../persistence/dbmanager";
import authorRouter from "./routes/authorroutes";
import { HttpStatus } from "./constants/httpstatus";
import postRouter from "./routes/postroutes";

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
app.use("/api/posts", postRouter);

app.get("/", (request, response) => {
  response.status(200).send("Hello World");
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode =
    err.status || err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    error: {
      message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    },
  });
};

app.use(errorHandler);

export default app;
