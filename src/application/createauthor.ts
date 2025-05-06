import { Author } from "../domain/author";
import { AuthorDto } from "./dtos/authordto";
import { NewAuthorRequest } from "./dtos/newauthor";
import {
  AuthorAlreadyExistsError,
  AuthorCreationError,
} from "./errors/authorerrors";
import { AuthorMapper } from "./mappers/authormapper";
import { AuthorRepository } from "./repositories/authorrespository";

export class CreateAuthor {
  constructor(private authorRepository: AuthorRepository) {}

  async execute(author: NewAuthorRequest): Promise<AuthorDto> {
    const fullName = author.fullName;

    let existingAuthor: Author | null;
    try {
      existingAuthor = await this.authorRepository.getAuthorByName(fullName);
    } catch (error) {
      throw new AuthorCreationError("Failed to check existing author");
    }

    if (existingAuthor) {
      throw new AuthorAlreadyExistsError(fullName);
    }

    const newAuthor = AuthorMapper.fromNewAuthorRequest(author);

    try {
      await this.authorRepository.save(newAuthor);
    } catch (error) {
      throw new AuthorCreationError("Failed to save new author");
    }

    return AuthorMapper.toDto(newAuthor);
  }
}
