import { RowDataPacket } from "mysql2";
import { AuthorRepository } from "../application/repositories/authorrespository";
import { Author } from "../domain/author";
import { DatabaseManager } from "./dbmanager";

interface AuthorModel extends RowDataPacket {
  idauthors: `${string}-${string}-${string}-${string}-${string}`;
  name: string;
  email: string;
  image_url: string | null;
}
type QueryField = "id" | "name" | "email";

const authorFieldMap: Record<QueryField, string> = {
  id: "idauthors",
  name: "name",
  email: "email",
};

export class MySQLAuthorRepository implements AuthorRepository {
  constructor(private dbManager: DatabaseManager) {}

  async getAllAuthors(): Promise<Author[]> {
    const query = `SELECT * FROM authors`;
    const authorRows = await this.dbManager.query<AuthorModel>(query);
    return authorRows.map(this.mapRowToAuthorEntity);
  }

  async getAuthorById(id: string): Promise<Author | null> {
    return this.getAuthorBy("id", id);
  }
  async getAuthorByName(name: string): Promise<Author | null> {
    return this.getAuthorBy("name", name);
  }

  async getAuthorByEmail(email: string): Promise<Author | null> {
    return this.getAuthorBy("email", email);
  }
  async save(author: Author): Promise<void> {
    const query = `
      INSERT INTO authors (idauthors, name, email, image_url)
      VALUES (?, ?, ?, ?)
    `;
    await this.dbManager.query(query, [
      author.getAuthorId(),
      author.getName(),
      author.getEmail(),
      author.getImageURL(),
    ]);
  }

  private async getAuthorBy(
    field: QueryField,
    value: string
  ): Promise<Author | null> {
    const columnName = authorFieldMap[field];
    const query = `SELECT * FROM authors WHERE ${columnName} = ?`;
    const results = await this.dbManager.query<AuthorModel>(query, [value]);

    if (results.length < 1) return null;

    return this.mapRowToAuthorEntity(results[0]);
  }

  private mapRowToAuthorEntity(row: AuthorModel): Author {
    const { idauthors, name, email, image_url } = row;
    return new Author(name, email, image_url ?? "", idauthors);
  }
}
