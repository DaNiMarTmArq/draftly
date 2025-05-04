export class AuthorNotFoundError extends Error {
  constructor(authorId: string) {
    super(`No author found with id: ${authorId}`);
    this.name = "AuthorNotFoundError";
  }
}

export class PostSaveError extends Error {
  constructor() {
    super("Failed to save post");
    this.name = "PostSaveError";
  }
}

export class PostsReadError extends Error {
  constructor() {
    super("Failed to read posts");
    this.name = "PostsReadError";
  }
}
