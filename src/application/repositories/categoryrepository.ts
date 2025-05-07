import { Category } from "../../domain/post";

export interface CategoryRepository {
  getCategoryByName(categoryName: string): Promise<Category | null>;
  getOrCreateCategory(categoryName: string): Promise<Category>;
}
