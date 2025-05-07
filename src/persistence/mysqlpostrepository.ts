import { RowDataPacket } from "mysql2";
import { PostRepository } from "../application/repositories/postrepository";
import { DatabaseManager } from "./dbmanager";
import { Category, Post } from "../domain/post";
import { Author } from "../domain/author";

interface PostRowData extends RowDataPacket {
  idposts: `${string}-${string}-${string}-${string}-${string}`;
  title: string;
  description: string;
  creation_date: Date;
  modified_at: Date;
  author_id: `${string}-${string}-${string}-${string}-${string}`;
  category_id: number;

  author_name: string;
  author_email: string;
  author_image_url: string | null;

  category_name: string;
}

export class MySQLPostRepository implements PostRepository {
  constructor(private dbManager: DatabaseManager) {}

  private mapRowToPost(row: PostRowData): Post {
    const author = new Author(
      row.author_name,
      row.author_email,
      row.author_image_url ?? "",
      row.author_id
    );

    const category: Category = {
      id: row.category_id,
      name: row.category_name,
    };

    const post = new Post(
      row.title,
      row.description,
      category,
      author,
      new Date(row.creation_date),
      row.modified_at,
      row.idposts
    );

    return post;
  }

  async savePost(newPost: Post): Promise<void> {
    const query = `
      INSERT INTO posts (idposts, title, description, creation_date, modified_at, author_id, category_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    await this.dbManager.query(query, [
      newPost.getPostId(),
      newPost.getTitle(),
      newPost.getBody(),
      newPost.getCreationDate(),
      newPost.getLastModificationDate(),
      newPost.getAuthor().getAuthorId(),
      newPost.getCategory().id,
    ]);
  }

  async getAll(): Promise<Post[]> {
    const query = `
      SELECT
          p.idposts, p.title, p.description, p.creation_date, p.modified_at,
          p.author_id, 
          a.name AS author_name, a.email AS author_email, a.image_url AS author_image_url,
          p.category_id, 
          c.name AS category_name
      FROM
          posts p
      JOIN
          authors a ON p.author_id = a.idauthors
      JOIN
          categories c ON p.category_id = c.idcategories;
    `;
    const rows = await this.dbManager.query<PostRowData>(query);
    return rows.map((row) => this.mapRowToPost(row));
  }

  async getById(id: string): Promise<Post | null> {
    const query = `
      SELECT
          p.idposts, p.title, p.description, p.creation_date, p.modified_at,
          p.author_id,
          a.name AS author_name, a.email AS author_email, a.image_url AS author_image_url,
          p.category_id,
          c.name AS category_name
      FROM
          posts p
      JOIN
          authors a ON p.author_id = a.idauthors
      JOIN
          categories c ON p.category_id = c.idcategories
      WHERE
          p.idposts = ?;
    `;
    const rows = await this.dbManager.query<PostRowData>(query, [id]);
    if (rows.length === 0) {
      return null;
    }
    return this.mapRowToPost(rows[0]);
  }

  async getByAuthor(authorName: string): Promise<Post[]> {
    const query = `
      SELECT
          p.idposts, p.title, p.description, p.creation_date, p.modified_at,
          p.author_id,
          a.name AS author_name, a.email AS author_email, a.image_url AS author_image_url,
          p.category_id,
          c.name AS category_name
      FROM
          posts p
      JOIN
          authors a ON p.author_id = a.idauthors
      JOIN
          categories c ON p.category_id = c.idcategories
      WHERE
          a.name = ?;
    `;
    const rows = await this.dbManager.query<PostRowData>(query, [authorName]);
    return rows.map((row) => this.mapRowToPost(row));
  }
}
