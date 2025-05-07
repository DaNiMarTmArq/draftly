import { Category } from "../../domain/post";

export interface CategoryRepository {
  getCategoryByName(categoryName: string): Promise<Category | null>;
  saveCategory(categoryName: string): Promise<void>;
  getOrCreateCategory(categoryName: string): Promise<Category>;
}
