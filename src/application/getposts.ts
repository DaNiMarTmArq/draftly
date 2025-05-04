import { PostDto } from "./dtos/postdto";
import { PostsReadError } from "./errors/posterrors";
import { PostMapper } from "./mappers/postmapper";
import { PostRepository } from "./repositories/postrepository";

export class GetPosts {
  constructor(private postRepository: PostRepository) {}

  async allPosts(): Promise<PostDto[]> {
    try {
      const posts = await this.postRepository.getAll();
      return posts.map(PostMapper.toDto);
    } catch (error) {
      throw new PostsReadError();
    }
  }
}
