import { Author } from "../../domain/author";

export interface AuthorRepository {
  getAllAuthors(): Promise<Author[]>;
  getAuthorById(id: string): Promise<Author | null>;
  getAuthorByName(name: string): Promise<Author | null>;
  save(author: Author): Promise<void>;
}
