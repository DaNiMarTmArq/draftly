import { z, ZodError } from "zod";
import { NewPostRequest } from "../../application/dtos/newpost";
import { Validator } from "./validator";

export class PostDtoValidator implements Validator<NewPostRequest> {
  private newPostRequestSchema = z.object({
    title: z.string().min(1, "Title is required"),
    body: z.string().min(1, "Body is required"),
    categoryName: z.string().min(1, "Category name is required"),
    authorName: z.string().min(1, "Author name is required"),
  });

  validate(dto: NewPostRequest): NewPostRequest {
    try {
      return this.newPostRequestSchema.parse(dto);
    } catch (error) {
      if (error instanceof ZodError) {
        throw error;
      }
      throw new Error("Unexpected validation error");
    }
  }
}
