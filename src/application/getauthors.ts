import { AuthorDto } from "./dtos/authordto";
import { AuthorNotFoundError, AuthorReadError } from "./errors/authorerrors";
import { AuthorMapper } from "./mappers/authormapper";
import { AuthorRepository } from "./repositories/authorrespository";

export class GetAuthors {
  constructor(private authorRepository: AuthorRepository) {}

  async getAllAuthors(): Promise<AuthorDto[]> {
    try {
      const authors = await this.authorRepository.getAllAuthors();
      return authors.map(AuthorMapper.toDto);
    } catch (error) {
      throw new AuthorReadError();
    }
  }
  async getSingle(authorId: string): Promise<AuthorDto | undefined> {
    let author;
    try {
      author = await this.authorRepository.getAuthorById(authorId);
      if (!author) throw new AuthorNotFoundError(authorId);
      return AuthorMapper.toDto(author);
    } catch (error) {
      if (error instanceof AuthorNotFoundError) throw error;
      throw new AuthorReadError();
    }
  }
}
