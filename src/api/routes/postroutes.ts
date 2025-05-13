import express from "express";
import { DatabaseManager } from "../../persistence/dbmanager";
import { PostController } from "../controllers/postcontroller";
import { MySQLPostRepository } from "../../persistence/mysqlpostrepository";
import { CreatePost } from "../../application/createpost";
import {
  authorRepository,
  categoryRepository,
  postRepository,
} from "./repositoryinstances";
import { PostDtoValidator } from "../validators/postdtovalidator";

const postRouter = express.Router();

const createPost = new CreatePost(
  postRepository,
  authorRepository,
  categoryRepository
);
const postController = new PostController(createPost, new PostDtoValidator());

postRouter.post("/", (req, res) => postController.createPost(req, res));

export default postRouter;
