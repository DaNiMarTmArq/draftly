import { Post } from "../domain/post";
import { PostsReadError } from "./errors/posterrors";
import { PostRepository } from "./repositories/postrepository";

export class GetPosts {
  constructor(private postRepository: PostRepository) {}

  allPosts(): Promise<Post[]> {
    try {
      return this.postRepository.getAll();
    } catch (error) {
      throw new PostsReadError();
    }
  }
}
