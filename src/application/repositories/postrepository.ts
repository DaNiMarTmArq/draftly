import { Post } from "../../domain/post";

export interface PostRepository {
  savePost(newPost: Post): Promise<void>;
}
