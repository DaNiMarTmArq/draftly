import { Author } from "../../domain/author";
import { Post } from "../../domain/post";
import { NewPostRequest } from "../dtos/newpost";
import { PostDto } from "../dtos/postdto";
import { AuthorMapper } from "./authormapper";

export class PostMapper {
  public static toDto(post: Post): PostDto {
    return {
      postId: post.getPostId(),
      title: post.getTitle(),
      body: post.getBody(),
      creationDate: post.getCreationDate().toDateString(),
      lastModificationDate: post.getLastModificationDate().toDateString(),
      category: post.getCategory().name,
      author: AuthorMapper.toDto(post.getAuthor()),
    };
  }
}
