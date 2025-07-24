import * as uiid from "uuid";

import { ENV } from "../config";
import { chooseDatabase } from "../database";
import Stock from "../models/test/Stock";

export const insert = async (stock: Stock) => {
  if (ENV === "development") {
    const db = chooseDatabase();
    const stmt = db.prepare(`
        INSERT INTO stock (id, sizes, availableColors, details, total, status) VALUES (?, ?, ?, ?, ?, ?)
        `);

    const id = uiid.v7(); // id stock
    const res = stmt.run(
      id,
      JSON.stringify(stock.sizes),
      JSON.stringify(stock.availableColors),
      JSON.stringify(stock.details),
      stock.total,
      stock.status
    );

    return res;
  }
};

export const items = async () => {
  if (ENV === "development") {
    const db = chooseDatabase();
    const stmt = db.prepare(`
        SELECT * FROM stock
        `);
    const items = stmt.all();
    return items as Stock[];
  }
};

export const remove = async (stockId: string) => {
  if (ENV === "development") {
    const db = chooseDatabase();
    const stmt = db.prepare(`
      DELETE FROM stock WHERE id = ?
      `);
    const res = stmt.run(stockId);
    return res;
  }
};
