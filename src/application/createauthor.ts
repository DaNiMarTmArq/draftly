import { Author } from "../domain/author";
import { AuthorResponse } from "./dtos/authorresponse";
import { NewAuthorRequest } from "./dtos/newauthor";
import { AuthorRepository } from "./repositories/authorrespository";

export class AuthorAlreadyExistsError extends Error {
  constructor(fullName: string) {
    super(`Author with name "${fullName}" already exists`);
    this.name = "AuthorAlreadyExistsError";
  }
}

export class AuthorCreationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthorCreationError";
  }
}

export class CreateAuthor {
  constructor(private authorRepository: AuthorRepository) {}

  async execute(author: NewAuthorRequest) {
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
