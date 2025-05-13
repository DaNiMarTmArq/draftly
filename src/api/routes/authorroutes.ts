import express from "express";
import { AuthorController } from "../controllers/authorcontroller";
import { CreateAuthor } from "../../application/createauthor";
import { MySQLAuthorRepository } from "../../persistence/mysqlauthorrepository";
import { DatabaseManager } from "../../persistence/dbmanager";
import { AuthorDtoValidator } from "../validators/authordtovalidator";
import { GetAuthors } from "../../application/getauthors";
import { authorRepository } from "./repositoryinstances";

const authorRouter = express.Router();

const createUseCase = new CreateAuthor(authorRepository);
const getUseCase = new GetAuthors(authorRepository);
const authorController = new AuthorController(
  createUseCase,
  getUseCase,
  new AuthorDtoValidator()
);

authorRouter.post("/", (req, res) => authorController.createAuthor(req, res));
authorRouter.get("/", (req, res) => authorController.getAllAuthors(req, res));

export default authorRouter;
