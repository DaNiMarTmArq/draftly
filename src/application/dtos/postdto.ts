import { UUID } from "crypto";
import { AuthorDto } from "./authordto";

export interface PostDto {
  postId: UUID;
  title: string;
  body: string;
  creationDate: string;
  lastModificationDate: string;
  category: string;
  author: AuthorDto;
}
