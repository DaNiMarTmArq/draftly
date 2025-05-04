import { Author } from "../../domain/author";

export interface AuthorRepository {
  getAuthorById(authorId: string): Promise<Author | null>;
}
