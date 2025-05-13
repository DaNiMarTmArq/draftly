import {
  authorRepository,
  categoryRepository,
  postRepository,
} from "./repositoryinstances";
import express from "express";
import { CreatePost } from "../../application/createpost";
import { PostController } from "../controllers/postcontroller";
import { PostDtoValidator } from "../validators/postdtovalidator";
import { DatabaseManager } from "../../persistence/dbmanager";

const postRouter = express.Router();

const createPost = new CreatePost(
  postRepository,
  authorRepository,
  categoryRepository
);
const postController = new PostController(createPost, new PostDtoValidator());

postRouter.post("/", (req, res) => postController.createPost(req, res));

export default postRouter;
