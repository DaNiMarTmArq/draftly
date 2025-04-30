import { Post } from "./post.js";

export class Author {
  private name: string;
  private email: string;
  private imageURL: string;

  constructor(name: string, email: string, imageURL: string) {
    this.name = name;
    this.email = email;
    this.imageURL = imageURL;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public getImageURL(): string {
    return this.imageURL;
  }

  public setImageURL(imageURL: string): void {
    this.imageURL = imageURL;
  }

  public writePost(title: string, content: string, category: string): Post {
    return new Post(title, content, new Date(), category, this);
  }
}
