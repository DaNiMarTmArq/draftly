import { authorRepository } from "./repositoryinstances";
import express from "express";
import { CreateAuthor } from "../../application/createauthor";
import { GetAuthors } from "../../application/getauthors";
import { AuthorController } from "../controllers/authorcontroller";
import { AuthorDtoValidator } from "../validators/authordtovalidator";
import { DatabaseManager } from "../../persistence/dbmanager";

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
