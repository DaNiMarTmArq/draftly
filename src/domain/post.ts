import { Author } from "./author.js";

export class Post {
  private title: string;
  private description: string;
  private creationDate: Date;
  private lastModificationDate: Date;
  private category: string;
  private author: Author;

  constructor(
    title: string,
    description: string,
    creationDate: Date,
    category: string,
    author: Author
  ) {
    this.title = title;
    this.description = description;
    this.creationDate = creationDate;
    this.category = category;
    this.author = author;
    this.lastModificationDate = creationDate;
  }

  public getLastModificationDate(): Date {
    return this.lastModificationDate;
  }

  public setLastModificationDate(date: Date): void {
    this.lastModificationDate = date;
  }

  public getTitle(): string {
    return this.title;
  }

  public setTitle(title: string): void {
    this.title = title;
  }

  public getDescription(): string {
    return this.description;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public getCreationDate(): Date {
    return this.creationDate;
  }

  public getCategory(): string {
    return this.category;
  }

  public setCategory(category: string): void {
    this.category = category;
  }

  public getAuthor(): Author {
    return this.author;
  }
}
