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

export class PostNotFoundError extends Error {
  constructor(postId: string) {
    super(`Post with Id ${postId} not found`);
    this.name = "PostNotFoundError";
  }
}

export class CategoryError extends Error {
  constructor() {
    super("Failed to retrieve or create category");
    this.name = "CategoryError";
  }
}
