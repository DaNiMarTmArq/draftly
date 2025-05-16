import { Request, Response } from "express";
import { CreatePost } from "../../application/createpost";
import { Validator } from "../validators/validator";
import { NewPostRequest } from "../../application/dtos/newpost";
import { ZodError } from "zod";
import { HttpStatus } from "../constants/httpstatus";
import { AuthorNotFoundError } from "../../application/errors/authorerrors";
import {
  CategoryError,
  PostSaveError,
} from "../../application/errors/posterrors";
import { GetPosts } from "../../application/getposts";

export class PostController {
  constructor(
    private createPostUseCase: CreatePost,
    private getPostsUseCase: GetPosts,
    private postValidator: Validator<NewPostRequest>
  ) {}

  async createPost(req: Request, res: Response) {
    let createReq: NewPostRequest;
    try {
      createReq = this.postValidator.validate(req.body);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(HttpStatus.BAD_REQUEST).json(error.issues);
      }
      return;
    }
    let newPost;
    try {
      newPost = await this.createPostUseCase.execute(createReq);
    } catch (error) {
      if (error instanceof AuthorNotFoundError) {
        res.status(HttpStatus.BAD_REQUEST).json({
          error: error.message,
        });
        return;
      }

      if (error instanceof CategoryError || error instanceof PostSaveError) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          error: error.message,
        });
        return;
      }
    }

    res.status(HttpStatus.CREATED).json(newPost);
    return;
  }

  async getAllPosts(req: Request, res: Response) {
    const posts = await this.getPostsUseCase.getAllPosts();
    res.status(HttpStatus.OK).json(posts);
    return;
  }

  async getSinglePost(req: Request, res: Response) {
    const { postId } = req.params;
    const post = await this.getPostsUseCase.getSinglePost(postId);
    res.status(HttpStatus.OK).json(post);
    return;
  }
}
