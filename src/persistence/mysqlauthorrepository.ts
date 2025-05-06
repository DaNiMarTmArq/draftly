import { RowDataPacket } from "mysql2";
import { AuthorRepository } from "../application/repositories/authorrespository";
import { Author } from "../domain/author";
import { DatabaseManager } from "./dbmanager";
import { UUID } from "crypto";

interface AuthorModel extends RowDataPacket {
  idauthors: UUID;
  name: string;
  email: string;
  image_url: string;
}

export class MySQLAuthorRepository implements AuthorRepository {
  constructor(private dbManager: DatabaseManager) {}

  async getAuthorById(id: string): Promise<Author | null> {
    const query = "SELECT * FROM authors WHERE idauthors = ?";
    const queryParams = [id];
    const results = await this.dbManager.query<AuthorModel>(query, queryParams);

    if (results.length < 1) return null;

    const { idauthors, name, email, image_url } = results[0];

    return new Author(name, email, image_url ?? "", idauthors);
  }
  async getAuthorByName(name: string): Promise<Author | null> {
    throw new Error("Method not implemented.");
  }
  async save(author: Author): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
