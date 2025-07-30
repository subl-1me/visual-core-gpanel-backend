import { ENV } from "../config";
import { chooseDatabase } from "../database";
import Customer from "../models/test/Customer";
import * as uuid from "uuid";

export const insert = async (customer: Customer) => {
  if (ENV === "development") {
    const db = chooseDatabase();
    const stmt = db.prepare(`
            INSERT INTO customer (id, name, email, phone, address, level, pastOrders) VALUES (?, ?, ?, ?, ?, ?, ?)
            `);

    const id = uuid.v7();
    const response = stmt.run(
      id,
      customer.name,
      customer.email,
      customer.phone,
      customer.address,
      1,
      JSON.stringify([])
    );

    return response;
  }
};

export const items = async () => {
  if (ENV === "development") {
    const db = chooseDatabase();
    const stmt = db.prepare(`
            SELECT * FROM customer
            `);
    const response = stmt.all();
    return response;
  }
};

export const remove = async (customerId: string) => {};
