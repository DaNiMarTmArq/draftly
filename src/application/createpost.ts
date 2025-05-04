import { Post } from "../domain/post";
import { NewPostRequest } from "./dtos/newpost";
import { AuthorRepository } from "./repositories/authorrespository";
import { PostRepository } from "./repositories/postrepository";

export class AuthorNotFoundError extends Error {
  constructor(authorId: string) {
    super(`No author found with id: ${authorId}`);
    this.name = "AuthorNotFoundError";
  }
}

export class PostSaveFailedError extends Error {
  constructor() {
    super("Failed to save post");
    this.name = "PostSaveFailedError";
  }
}

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
      throw new PostSaveFailedError();
    }

    return newPost;
  }
}
