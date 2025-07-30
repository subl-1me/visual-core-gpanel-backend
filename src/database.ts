import Database from "better-sqlite3";
import { ENV, TEST_DB_PATH } from "./config";
import path from "path";

export const chooseDatabase = () => {
  try {
    if (ENV === "development") {
      const devDb = path.resolve(__dirname, TEST_DB_PATH);
      const db = new Database(devDb);
      // init tables
      db.prepare(
        `CREATE TABLE IF NOT EXISTS admin (
            pos INTEGER PRIMARY KEY AUTOINCREMENT,
            id TEXT NOT NULL UNIQUE,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`
      ).run();

      db.prepare(
        `CREATE TABLE IF NOT EXISTS stock (
            pos INTEGER PRIMARY KEY AUTOINCREMENT,
            id TEXT NOT NULL UNIQUE,
            sizes TEXT NOT NULL ,
            availableColors TEXT NOT NULL,
            details TEXT NOT NULL,
            status TEXT NOT NULL,
            total INTEGER NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`
      ).run();

      db.prepare(
        `CREATE TABLE IF NOT EXISTS shirts (
            no INTEGER PRIMARY KEY AUTOINCREMENT,
            id TEXT NOT NULL UNIQUE,
            identificator TEXT NOT NULL UNIQUE,
            name TEXT NOT NULL ,
            description TEXT NOT NULL ,
            price REAL NOT NULL ,
            coverImageUrl TEXT NOT NULL ,
            tier TEXT NOT NULL ,
            colors TEXT NOT NULL ,
            media TEXT NOT NULL ,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`
      ).run();

      db.prepare(
        `CREATE TABLE IF NOT EXISTS customer (
            no INTEGER PRIMARY KEY AUTOINCREMENT,
            id TEXT NOT NULL UNIQUE,
            name TEXT NOT NULL ,
            email TEXT NOT NULL ,
            phone TEXT NOT NULL ,
            address TEXT NOT NULL ,
            level INTEGER NOT NULL,
            pastOrders TEXT NOT NULL ,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`
      ).run();

      db.prepare(
        `CREATE TABLE IF NOT EXISTS sale (
            no INTEGER PRIMARY KEY AUTOINCREMENT,
            id TEXT NOT NULL UNIQUE,
            customer TEXT NOT NULL,
            items TEXT NOT NULL,
            total REAL NOT NULL,
            paymentMethod TEXT NOT NULL,
            additionalNotes TEXT NOT NULL,
            type TEXT NOT NULL,
            status TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`
      ).run();

      db.prepare(
        `CREATE TABLE IF NOT EXISTS siteconfig (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            siteName TEXT NOT NULL,
            siteDescription TEXT NOT NULL,
            siteLogo TEXT NOT NULL,
            siteFooter TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`
      ).run();

      return db;
    } else {
      return new Database("gpanel.db", { verbose: console.log });
    }
  } catch (error) {
    console.error("Error initializing database:", error);
    throw new Error("Database initialization failed");
  }
};
