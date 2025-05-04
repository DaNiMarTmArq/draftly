import { Post } from "../../domain/post";

export interface PostRepository {
  savePost(newPost: Post): Promise<void>;
  getAll(): Promise<Post[]>;
  getById(id: string): Promise<Post | null>;
  getByAuthor(authorName: string): Promise<Post[]>;
}
