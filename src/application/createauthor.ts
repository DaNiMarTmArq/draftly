import { Author } from "../domain/author";
import { AuthorResponse } from "./dtos/authorresponse";
import { NewAuthorRequest } from "./dtos/newauthor";
import {
  AuthorAlreadyExistsError,
  AuthorCreationError,
} from "./errors/authorerrors";
import { AuthorRepository } from "./repositories/authorrespository";

export class CreateAuthor {
  constructor(private authorRepository: AuthorRepository) {}

  async execute(author: NewAuthorRequest): Promise<AuthorResponse> {
    const { fullName, email, imageURL } = author;

    const existingAuthor = await this.authorRepository.getAuthorByName(
      fullName
    );
    if (existingAuthor) {
      throw new AuthorAlreadyExistsError(fullName);
    }

    const newAuthor = new Author(fullName, email, imageURL ?? "");
    try {
      await this.authorRepository.save(newAuthor);

      const response: AuthorResponse = {
        authorId: newAuthor.getAuthorId(),
        fullName,
        email,
        imageURL: imageURL ?? "",
      };

      return response;
    } catch (error: any) {
      throw new AuthorCreationError("Failed to save new author");
    }
  }
}
