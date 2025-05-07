import { RowDataPacket } from "mysql2";
import { Category } from "../domain/post";
import { DatabaseManager } from "./dbmanager";
import { CategoryRepository } from "../application/repositories/categoryrepository";

interface CategoryRowData extends RowDataPacket {
  idcategories: number;
  category_name: string;
}

export class MySQLCategoryRepository implements CategoryRepository {
  constructor(private dbManager: DatabaseManager) {}

  private mapRowToCategory(row: CategoryRowData): Category {
    return {
      id: row.idcategories,
      name: row.category_name,
    };
  }

  async getCategoryByName(categoryName: string): Promise<Category | null> {
    const query =
      "SELECT idcategories, category_name FROM categories WHERE category_name = ?";
    const rows = await this.dbManager.query<CategoryRowData>(query, [
      categoryName,
    ]);

    if (rows.length === 0) {
      return null;
    }
    return this.mapRowToCategory(rows[0]);
  }

  async getOrCreateCategory(categoryName: string): Promise<Category> {
    let category = await this.getCategoryByName(categoryName);

    if (category) {
      return category;
    }

    try {
      const insertQuery = "INSERT INTO categories (category_name) VALUES (?)";
      await this.dbManager.query(insertQuery, [categoryName]);
    } catch (error: any) {
      if (error.code === "ER_DUP_ENTRY" || error.errno === 1062) {
      } else {
        throw error;
      }
    }
    category = await this.getCategoryByName(categoryName);

    if (!category) {
      throw new Error(
        `Failed to create or retrieve category: ${categoryName}.`
      );
    }

    return category;
  }
}
