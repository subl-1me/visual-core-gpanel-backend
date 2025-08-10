import { error } from "console";
import { ENV } from "../config";
import { chooseDatabase } from "../database";

export const insert = async (user: any) => {
  if (ENV === "development") {
    const db = chooseDatabase();
    const stmt = db.prepare(
      "INSERT INTO admin (id, username, email, password) VALUES (?, ?, ?, ?)"
    );
    const response = stmt.run(
      user.newId,
      user.username,
      user.email,
      user.password
    );

    return {
      error: false,
      response,
    };
  }

  //TODO: Use prod db
};

export const items = async () => {
  if (ENV === "development") {
    const db = chooseDatabase();
    const stmt = db.prepare(`SELECT * FROM admin`);
    const items = stmt.all();
    return items;
  }
};

export const item = async (id: string = "", username: string = "") => {
  if (ENV === "development") {
    const db = chooseDatabase();
    const stmt =
      id !== ""
        ? db.prepare(`SELECT * FROM admin WHERE id = ?`)
        : db.prepare(`SELECT * FROM admin WHERE username = ?`);
    const item = stmt.get(id !== "" ? id : username);
    return item;
  }
};

export const update = async (adminId: string, data: any) => {
  if (ENV === "development") {
    const db = chooseDatabase();
    const stmt = db.prepare(
      `UPDATE admin SET username = ?, email = ?, name = ?, lastname = ? WHERE id = ?`
    );
    const response = stmt.run(
      data.username,
      data.email,
      data.name,
      data.lastname,
      adminId
    );

    return {
      error: false,
      response,
    };
  }

  return { error: true, message: "Database not available." };
};
