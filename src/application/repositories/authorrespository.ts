import { Author } from "../../domain/author";

export interface AuthorRepository {
  getAuthorById(id: string): Promise<Author | null>;
  getAuthorByName(name: string): Promise<Author | null>;
}
