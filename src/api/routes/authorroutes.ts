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

/**
 * @swagger
 * /api/authors:
 *   get:
 *     summary: Get all authors
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: List of authors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Author'
 */
authorRouter.get("/", (req, res) => authorController.getAllAuthors(req, res));

/**
 * @swagger
 * /api/authors/{authorId}:
 *   get:
 *     summary: Get a single author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: authorId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Author found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       404:
 *         description: Author not found
 */
authorRouter.get("/:authorId", (req, res) =>
  authorController.getAuthor(req, res)
);

/**
 * @swagger
 * /api/authors/{authorId}/posts:
 *   get:
 *     summary: Get posts written by a specific author
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: authorId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of posts by the author
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   postId:
 *                     type: string
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 */
authorRouter.get("/:authorId/posts", (req, res) =>
  authorController.getAuthorWithPosts(req, res)
);

/**
 * @swagger
 * /api/authors:
 *   post:
 *     summary: Create a new author
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - imageURL
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               imageURL:
 *                 type: string
 *     responses:
 *       201:
 *         description: Author created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       400:
 *         description: Invalid request or author already exists
 */
authorRouter.post("/", (req, res) => authorController.createAuthor(req, res));

export default authorRouter;
