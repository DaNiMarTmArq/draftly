import express from "express";
import { CreatePost } from "../../application/createpost";
import { GetPosts } from "../../application/getposts";
import { PostController } from "../controllers/postcontroller";
import { PostDtoValidator } from "../validators/postdtovalidator";
import {
  authorRepository,
  categoryRepository,
  postRepository,
} from "../../persistence/repositoryinstances";

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

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: List of all posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
postRouter.get("/", (req, res) => postController.getAllPosts(req, res));

/**
 * @swagger
 * /api/posts/{postId}:
 *   get:
 *     summary: Get a single post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 */
postRouter.get("/:postId", (req, res) =>
  postController.getSinglePost(req, res)
);

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - body
 *               - categoryName
 *               - authorName
 *             properties:
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *               categoryName:
 *                 type: string
 *               authorName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Invalid input or post creation failed
 */
postRouter.post("/", (req, res) => postController.createPost(req, res));

export default postRouter;
