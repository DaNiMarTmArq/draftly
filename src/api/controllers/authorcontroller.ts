import { Request, Response } from "express";
import { CreateAuthor } from "../../application/createauthor";
import { NewAuthorRequest } from "../../application/dtos/newauthor";
import { HttpStatus } from "../constants/httpstatus";

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
    //Handle errors from use case
    const newAuthor = await this.createUseCase.execute(createReq);
    res.status(HttpStatus.CREATED).json(newAuthor);
  }
}
