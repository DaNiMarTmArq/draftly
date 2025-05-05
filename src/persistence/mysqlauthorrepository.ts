import { AuthorRepository } from "../application/repositories/authorrespository";
import { Author } from "../domain/author";

export class MySQLAuthorRepository implements AuthorRepository {
  async getAuthorById(id: string): Promise<Author | null> {
    throw new Error("Method not implemented.");
  }
  async getAuthorByName(name: string): Promise<Author | null> {
    throw new Error("Method not implemented.");
  }
  async save(author: Author): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
