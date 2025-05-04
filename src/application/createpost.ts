import { NewPostRequest } from "./dtos/newpost";
import { PostDto } from "./dtos/postdto";
import { AuthorNotFoundError, PostSaveError } from "./errors/posterrors";
import { PostMapper } from "./mappers/postmapper";
import { AuthorRepository } from "./repositories/authorrespository";
import { PostRepository } from "./repositories/postrepository";

export class CreatePost {
  constructor(
    private postRepository: PostRepository,
    private authorRepository: AuthorRepository
  ) {}

  async execute(post: NewPostRequest): Promise<PostDto> {
    const { title, body, category, authorName } = post;
    const author = await this.authorRepository.getAuthorByName(authorName);

    if (!author) throw new AuthorNotFoundError(authorName);

    const newPost = author.writePost(title, body, category);

    try {
      await this.postRepository.savePost(newPost);
    } catch (error: any) {
      throw new PostSaveError();
    }

    return PostMapper.toDto(newPost);
  }
}
