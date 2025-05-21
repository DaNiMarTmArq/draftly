import express, { ErrorRequestHandler } from "express";
import { DatabaseManager } from "../persistence/dbmanager";
import { HttpStatus } from "./constants/httpstatus";
import router from "./routes/routes.index";

const app = express();

DatabaseManager.initialize({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT as unknown as number,
});

app.use(express.json());
app.use("/api", router);

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
