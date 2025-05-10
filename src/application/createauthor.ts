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
    const emailExists = await this.authorExists(
      () => this.authorRepository.getAuthorByEmail(author.email),
      "email",
      author.email
    );

    const formattedName = this.capitalize(author.fullName.toLowerCase());

    const nameExists = await this.authorExists(
      () => this.authorRepository.getAuthorByName(formattedName),
      "name",
      author.fullName
    );

    author.fullName = formattedName;
    const newAuthor = AuthorMapper.toEntity(author);

    try {
      await this.authorRepository.save(newAuthor);
    } catch (error) {
      throw new AuthorCreationError("Failed to save new author");
    }

    return AuthorMapper.toDto(newAuthor);
  }

  private async authorExists(
    fetchFn: () => Promise<Author | null>,
    field: string,
    value: string
  ): Promise<boolean> {
    try {
      const existingAuthor = await fetchFn();
      if (existingAuthor) {
        throw new AuthorAlreadyExistsError(value, field);
      }
      return false;
    } catch (error) {
      if (error instanceof AuthorAlreadyExistsError) throw error;
      throw new AuthorCreationError(
        `Failed to check existing author by ${field}`
      );
    }
  }

  private capitalize(name: string): string {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
}
