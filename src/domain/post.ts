import { Author } from "./author";
import { randomUUID, UUID } from "crypto";

interface Category {
  name: string;
}

export class Post {
  private postId: UUID;
  private title: string;
  private body: string;
  private creationDate: Date;
  private lastModificationDate: Date;
  private category: Category;
  private author: Author;

  constructor(
    title: string,
    description: string,
    category: Category,
    author: Author,
    creationDate: Date = new Date()
  ) {
    this.postId = randomUUID();
    this.title = title;
    this.body = description;
    this.creationDate = creationDate;
    this.category = category;
    this.author = author;
    this.lastModificationDate = creationDate;
  }

  public getPostId(): UUID {
    return this.postId;
  }

  public getLastModificationDate(): Date {
    return this.lastModificationDate;
  }

  public updateModificationDate(date: Date): void {
    this.lastModificationDate = date;
  }

  public getTitle(): string {
    return this.title;
  }

  public updateTitle(title: string): void {
    this.title = title;
  }

  public getBody(): string {
    return this.body;
  }

  public updatebody(body: string): void {
    this.body = body;
  }

  public getCreationDate(): Date {
    return this.creationDate;
  }

  public getCategory(): Category {
    return this.category;
  }

  public setCategory(category: Category): void {
    this.category = category;
  }

  public getAuthor(): Author {
    return this.author;
  }
}
