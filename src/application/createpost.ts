import { NewPostRequest } from "./dtos/newpost";
import { PostDto } from "./dtos/postdto";
import { AuthorNotFoundError } from "./errors/authorerrors";
import { PostSaveError } from "./errors/posterrors";

import { PostMapper } from "./mappers/postmapper";
import { AuthorRepository } from "./repositories/authorrespository";
import { CategoryRepository } from "./repositories/categoryrepository";
import { PostRepository } from "./repositories/postrepository";

export class CreatePost {
  constructor(
    private postRepository: PostRepository,
    private authorRepository: AuthorRepository,
    private categoryRepository: CategoryRepository
  ) {}

  async execute(post: NewPostRequest): Promise<PostDto> {
    const { title, body, categoryName, authorName } = post;
    let author;
    try {
      author = await this.authorRepository.getAuthorByName(authorName);
    } catch (error: any) {
      throw new AuthorNotFoundError(authorName);
    }

    if (!author) throw new AuthorNotFoundError(authorName);

    let categoryEntity;
    try {
      categoryEntity = await this.categoryRepository.getOrCreateCategory(
        categoryName
      );
    } catch (error) {
      throw new Error("Failed to retrieve or create category");
    }

    const newPost = author.writePost(title, body, categoryEntity);

    try {
      await this.postRepository.savePost(newPost);
    } catch (error) {
      throw new PostSaveError();
    }

    return PostMapper.toDto(newPost);
  }
}
