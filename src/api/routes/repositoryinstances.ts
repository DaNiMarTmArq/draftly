import { DatabaseManager } from "../../persistence/dbmanager";
import { MySQLAuthorRepository } from "../../persistence/mysqlauthorrepository";
import { MySQLCategoryRepository } from "../../persistence/mysqlcategoryrepository";
import { MySQLPostRepository } from "../../persistence/mysqlpostrepository";

DatabaseManager.initialize({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT as unknown as number,
});

const authorRepository = new MySQLAuthorRepository(
  DatabaseManager.getInstance()
);
const postRepository = new MySQLPostRepository(DatabaseManager.getInstance());
const categoryRepository = new MySQLCategoryRepository(
  DatabaseManager.getInstance()
);

export { authorRepository, postRepository, categoryRepository };
