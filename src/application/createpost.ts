import { Post } from "../domain/post";
import { NewPostRequest } from "./dtos/newpost";
import { AuthorNotFoundError, PostSaveError } from "./errors/posterrors";
import { AuthorRepository } from "./repositories/authorrespository";
import { PostRepository } from "./repositories/postrepository";

export class CreatePost {
  constructor(
    private postRepository: PostRepository,
    private authorRepository: AuthorRepository
  ) {}

  async execute(post: NewPostRequest): Promise<Post> {
    const { title, body, category, authorName } = post;
    const author = await this.authorRepository.getAuthorByName(authorName);

    if (!author) throw new AuthorNotFoundError(authorName);

    const newPost = author.writePost(title, body, category);

    try {
      await this.postRepository.savePost(newPost);
    } catch (error: any) {
      throw new PostSaveError();
    }

    return newPost;
  }
}
