import { PostRepository } from "./repositories/postrepository";

export class GetPosts {
  constructor(private postRepository: PostRepository) {}

  allPosts() {
    return this.postRepository.getAll();
  }
}
