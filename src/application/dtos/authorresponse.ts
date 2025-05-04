import { UUID } from "crypto";

export interface AuthorResponse {
  authorId: UUID;
  fullName: string;
  email: string;
  imageURL: string;
}
