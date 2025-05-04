import { Author } from "../../domain/author";
import { AuthorDto } from "../dtos/authordto";
import { NewAuthorRequest } from "../dtos/newauthor";

export class AuthorMapper {
  public static toDto(author: Author): AuthorDto {
    return {
      authorId: author.getAuthorId(),
      fullName: author.getName(),
      email: author.getEmail(),
      imageURL: author.getImageURL(),
    };
  }

  public static fromNewAuthorRequest(req: NewAuthorRequest): Author {
    return new Author(req.fullName, req.email, req.imageURL ?? "");
  }
}
