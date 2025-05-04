import { Post } from "../domain/post";
import { PostDto } from "./dtos/postdto";
import { AuthorNotFoundError } from "./errors/authorerrors";
import { PostNotFoundError, PostsReadError } from "./errors/posterrors";
import { PostMapper } from "./mappers/postmapper";
import { AuthorRepository } from "./repositories/authorrespository";
import { PostRepository } from "./repositories/postrepository";

export class GetPosts {
  constructor(
    private postRepository: PostRepository,
    private authorRepository: AuthorRepository
  ) {}

  async getSinglePost(postId: string): Promise<PostDto> {
    const post = await this.postRepository.getById(postId);
    if (!post) throw new PostNotFoundError(postId);

    return PostMapper.toDto(post);
  }

  async allPosts(): Promise<PostDto[]> {
    try {
      const posts = await this.postRepository.getAll();
      return this.buildPostListResponse(posts);
    } catch (error) {
      throw new PostsReadError();
    }
  }

  async allPostsByAuthor(authorName: string): Promise<PostDto[]> {
    const author = await this.authorRepository.getAuthorByName(authorName);
    if (!author) throw new AuthorNotFoundError(authorName);

    const posts = await this.postRepository.getByAuthor(authorName);
    return this.buildPostListResponse(posts);
  }

  private buildPostListResponse(posts: Post[]) {
    return posts.map(PostMapper.toDto);
  }
}
