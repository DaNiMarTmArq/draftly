import { UUID } from "crypto";

export interface AuthorDto {
  authorId: UUID;
  fullName: string;
  email: string;
  imageURL: string;
}
