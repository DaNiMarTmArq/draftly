import { Request, Response } from "express";
import { CreateAuthor } from "../../application/createauthor";
import { NewAuthorRequest } from "../../application/dtos/newauthor";
import { HttpStatus } from "../constants/httpstatus";
import {
  AuthorAlreadyExistsError,
  AuthorCreationError,
} from "../../application/errors/authorerrors";

export class AuthorController {
  constructor(private createUseCase: CreateAuthor) {}

  async createAuthor(req: Request, res: Response) {
    //Validate incoming DTO
    const { fullName, email, imageURL } = req.body;
    const createReq: NewAuthorRequest = {
      fullName: fullName as string,
      email: email as string,
      imageURL: imageURL ?? "",
    };
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
