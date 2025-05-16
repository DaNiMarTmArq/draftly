import express from "express";
import { CreatePost } from "../../application/createpost";
import { GetPosts } from "../../application/getposts";
import { PostController } from "../controllers/postcontroller";
import { PostDtoValidator } from "../validators/postdtovalidator";
import {
  authorRepository,
  categoryRepository,
  postRepository,
} from "./repositoryinstances";

const postRouter = express.Router();

const createPost = new CreatePost(
  postRepository,
  authorRepository,
  categoryRepository
);
const getPosts = new GetPosts(postRepository, authorRepository);
const postController = new PostController(
  createPost,
  getPosts,
  new PostDtoValidator()
);

postRouter.get("/", (req, res) => postController.getAllPosts(req, res));
postRouter.get("/:postId", (req, res) =>
  postController.getSinglePost(req, res)
);
postRouter.post("/", (req, res) => postController.createPost(req, res));

export default postRouter;
