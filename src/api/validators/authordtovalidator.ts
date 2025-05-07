import { z, ZodError } from "zod";
import { NewAuthorRequest } from "../../application/dtos/newauthor";
import { Validator } from "./validator";

export class AuthorDtoValidator implements Validator<NewAuthorRequest> {
  newAuthorRequestSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    imageURL: z.string().url("Invalid URL").optional(),
  });

  validate(dto: NewAuthorRequest): NewAuthorRequest {
    try {
      return this.newAuthorRequestSchema.parse(dto);
    } catch (error) {
      if (error instanceof ZodError) {
        throw error;
      }
      throw new Error("Unexpected validation error");
    }
  }
}
