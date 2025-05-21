import express from "express";
import { CreateAuthor } from "../../application/createauthor";
import { GetAuthors } from "../../application/getauthors";
import { GetPosts } from "../../application/getposts";
import { AuthorController } from "../controllers/authorcontroller";
import { AuthorDtoValidator } from "../validators/authordtovalidator";
import {
  authorRepository,
  postRepository,
} from "../../persistence/repositoryinstances";

const authorRouter = express.Router();

const createUseCase = new CreateAuthor(authorRepository);
const getUseCase = new GetAuthors(authorRepository);
const getPostsUseCase = new GetPosts(postRepository, authorRepository);
const authorController = new AuthorController(
  createUseCase,
  getUseCase,
  getPostsUseCase,
  new AuthorDtoValidator()
);

authorRouter.get("/", (req, res) => authorController.getAllAuthors(req, res));
authorRouter.get("/:authorId", (req, res) =>
  authorController.getAuthor(req, res)
);
authorRouter.get("/:authorId/posts", (req, res) =>
  authorController.getAuthorWithPosts(req, res)
);
authorRouter.post("/", (req, res) => authorController.createAuthor(req, res));

export default authorRouter;
