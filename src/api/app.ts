import express, { ErrorRequestHandler } from "express";
import swaggerUi from "swagger-ui-express";
import { HttpStatus } from "./constants/httpstatus";
import router from "./routes/routes.index";
import { AuthorNotFoundError } from "../application/errors/authorerrors";
import { PostNotFoundError } from "../application/errors/posterrors";
import { swaggerSpec } from "../swagger";

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use("/api", router);

app.get("/", (request, response) => {
  response.status(301).redirect("/api-docs");
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode =
    err.status || err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
  const message = err.message || "Internal Server Error";

  if (err instanceof AuthorNotFoundError || err instanceof PostNotFoundError)
    statusCode = HttpStatus.NOT_FOUND;

  res.status(statusCode).json({
    error: {
      message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    },
  });
};

app.use(errorHandler);

export default app;
