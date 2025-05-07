import { Request, Response } from "express";
import { CreateAuthor } from "../../application/createauthor";
import { NewAuthorRequest } from "../../application/dtos/newauthor";
import { HttpStatus } from "../constants/httpstatus";
import {
  AuthorAlreadyExistsError,
  AuthorCreationError,
} from "../../application/errors/authorerrors";
import { Validator } from "../validators/validator";

export class AuthorController {
  constructor(
    private createUseCase: CreateAuthor,
    private authorDtoValidator: Validator<NewAuthorRequest>
  ) {}

  async createAuthor(req: Request, res: Response) {
    let createReq: NewAuthorRequest;
    try {
      createReq = this.authorDtoValidator.validate(req.body);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json(error);
      return;
    }

    let newAuthor;
    try {
      newAuthor = await this.createUseCase.execute(createReq);
    } catch (error) {
      if (error instanceof AuthorCreationError) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          error: error.message,
        });
        if (error instanceof AuthorAlreadyExistsError) {
          res.status(HttpStatus.BAD_REQUEST).json({
            error: error.message,
          });
        }
      }
    }

    res.status(HttpStatus.CREATED).json(newAuthor);
  }
}
