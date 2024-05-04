import { Dialect, Sequelize } from "sequelize";
import { db } from ".";

class Database {
  public sequelize: Sequelize;
  private static instance: Database;
  
  private dialect: Dialect;
  private dbname: string;
  private username: string;
  private password: string;
  private host: string;
  private port: number;

  private constructor() {
    this.dialect = db.dialect,
    this.dbname = db.name,
    this.username = db.username,
    this.password = db.password,
    this.host = db.host,
    this.port = db.port,

    this.sequelize = new Sequelize(this.dbname, this.username, this.password, {
        host: this.host,
        dialect: this.dialect,
        dialectOptions: {
            encrypt: true,
        },
        port: this.port,
        logging: false,
        timezone: "utc",
        define: {
            timestamps: true,
            createdAt: true,
            updatedAt: true,
        },
    })
  }

  static createDbInstance(): Database {
    if (!Database.instance) {
        Database.instance = new Database()
    }

    return Database.instance;
  }
  
  async connection(): Promise<void> {
    try {
        await this.sequelize.authenticate();
        console.log(`${this.dialect} connected`)
    }
    catch (error: any) {
        console.error(`Database connection failed`);
        throw new Error(error.message)
    }
  }
}

const database = Database.createDbInstance();
export { database as Database }
