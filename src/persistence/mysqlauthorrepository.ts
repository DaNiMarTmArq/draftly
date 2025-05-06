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
type QueryField = "id" | "name";

const authorFieldMap: Record<QueryField, string> = {
  id: "idauthors",
  name: "name",
};

export class MySQLAuthorRepository implements AuthorRepository {
  constructor(private dbManager: DatabaseManager) {}

  async getAuthorById(id: string): Promise<Author | null> {
    return this.getAuthorBy("id", id);
  }
  async getAuthorByName(name: string): Promise<Author | null> {
    return this.getAuthorBy("name", name);
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

    const { idauthors, name, email, image_url } = results[0];
    return new Author(name, email, image_url ?? "", idauthors);
  }
}
