import { ENV } from "../config";
import { chooseDatabase } from "../database";
import Sale from "../models/test/Sale";
import * as uuid from "uuid";

export const insert = async (sale: Sale) => {
  if (ENV === "development") {
    const db = chooseDatabase();
    const stmt = db.prepare(`
            INSERT INTO sale (id, items, total, type, status, paymentMethod, additionalNotes, customer) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `);

    const id = uuid.v7();
    const response = stmt.run(
      id,
      JSON.stringify(sale.items),
      sale.total,
      sale.type,
      sale.status,
      sale.paymentMethod,
      sale.additionalNotes,
      JSON.stringify(sale.customer)
    );
    return response;
  }
};

export const items = async () => {
  if (ENV === "development") {
    const db = chooseDatabase();
    const stmt = db.prepare(`
            SELECT * FROM  sale
            `);
    const response = stmt.all();
    return response;
  }
};
