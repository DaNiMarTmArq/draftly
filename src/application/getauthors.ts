import { AuthorReadError } from "./errors/authorerrors";
import { AuthorMapper } from "./mappers/authormapper";
import { AuthorRepository } from "./repositories/authorrespository";

export class GetAuthors {
  constructor(private authorRepository: AuthorRepository) {}

  async getAllAuthors() {
    try {
      const authors = await this.authorRepository.getAllAuthors();
      return authors.map(AuthorMapper.toDto);
    } catch (error) {
      console.log(error);
      throw new AuthorReadError();
    }
  }
}
