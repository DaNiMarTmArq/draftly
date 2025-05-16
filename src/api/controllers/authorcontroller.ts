import { Request, Response } from "express";
import { ZodError } from "zod";
import { CreateAuthor } from "../../application/createauthor";
import { NewAuthorRequest } from "../../application/dtos/newauthor";
import {
  AuthorAlreadyExistsError,
  AuthorCreationError,
  AuthorReadError,
} from "../../application/errors/authorerrors";
import { GetAuthors } from "../../application/getauthors";
import { HttpStatus } from "../constants/httpstatus";
import { Validator } from "../validators/validator";
import { GetPosts } from "../../application/getposts";

export class AuthorController {
  constructor(
    private createUseCase: CreateAuthor,
    private getUseCase: GetAuthors,
    private getPostsUseCase: GetPosts,
    private authorDtoValidator: Validator<NewAuthorRequest>
  ) {}

  async createAuthor(req: Request, res: Response) {
    let createReq: NewAuthorRequest;
    try {
      createReq = this.authorDtoValidator.validate(req.body);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(HttpStatus.BAD_REQUEST).json(error.issues);
      }
      return;
    }

    let newAuthor;
    try {
      newAuthor = await this.createUseCase.execute(createReq);
    } catch (error) {
      if (error instanceof AuthorAlreadyExistsError) {
        res.status(HttpStatus.BAD_REQUEST).json({
          error: error.message,
        });
        return;
      }

      if (error instanceof AuthorCreationError) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          error: error.message,
        });
        return;
      }
    }

    res.status(HttpStatus.CREATED).json(newAuthor);
    return;
  }

  async getAllAuthors(req: Request, res: Response) {
    try {
      const authors = await this.getUseCase.getAllAuthors();
      res.status(HttpStatus.OK).json(authors);
      return;
    } catch (error) {
      if (error instanceof AuthorReadError) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          error: error.message,
        });
        return;
      }
    }
  }
  async getAuthor(req: Request, res: Response) {
    const { authorId } = req.params;
    const author = await this.getUseCase.getSingle(authorId);
    res.status(HttpStatus.OK).json(author);
    return;
  }

  async getAuthorWithPosts(req: Request, res: Response) {
    const { authorId } = req.params;
    const authorPosts = await this.getPostsUseCase.allPostsByAuthor(authorId);
    res.status(HttpStatus.OK).json(authorPosts);
    return;
  }
}
