import express from "express";
import { AuthorController } from "../controllers/authorcontroller";
import { CreateAuthor } from "../../application/createauthor";
import { MySQLAuthorRepository } from "../../persistence/mysqlauthorrepository";
import { DatabaseManager } from "../../persistence/dbmanager";
import { AuthorDtoValidator } from "../validators/authordtovalidator";

const authorRouter = express.Router();

DatabaseManager.initialize({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT as unknown as number,
});

const authorRepository = new MySQLAuthorRepository(
  DatabaseManager.getInstance()
);
const createUseCase = new CreateAuthor(authorRepository);
const authorController = new AuthorController(
  createUseCase,
  new AuthorDtoValidator()
);

authorRouter.post("/", (req, res) => authorController.createAuthor(req, res));

export default authorRouter;
