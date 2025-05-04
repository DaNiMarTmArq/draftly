export class AuthorAlreadyExistsError extends Error {
  constructor(fullName: string) {
    super(`Author with name "${fullName}" already exists`);
    this.name = "AuthorAlreadyExistsError";
  }
}

export class AuthorCreationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthorCreationError";
  }
}

export class AuthorNotFoundError extends Error {
  constructor(authorId: string) {
    super(`No author found with id: ${authorId}`);
    this.name = "AuthorNotFoundError";
  }
}
