import { createPool, Pool, PoolOptions, RowDataPacket } from "mysql2/promise";

export class DatabaseManager {
  private static instance: DatabaseManager;
  private pool: Pool;

  /**
   * Private constructor to ensure a single instance. initialize() is used to set up the pool.
   */
  private constructor(config: PoolOptions) {
    this.pool = createPool(config);
  }

  public static initialize(config: PoolOptions): void {
    if (DatabaseManager.instance) {
      return;
    }
    DatabaseManager.instance = new DatabaseManager(config);
  }

  public static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      throw new Error("DatabaseManager not initialized.");
    }
    return DatabaseManager.instance;
  }

  public async query<T extends RowDataPacket = RowDataPacket>(
    sql: string,
    params?: any[]
  ): Promise<T[]> {
    const [rows] = await this.pool.query<T[]>(sql, params);
    return rows;
  }
  /**
   * Close the pool and all its connections.
   */
  public async close(): Promise<void> {
    await this.pool.end();
  }
}
