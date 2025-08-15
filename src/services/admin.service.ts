import { ENV } from "../config";
import { chooseDatabase } from "../database";
import Admin from "../models/Admin";
import { ObjectId } from "mongodb";

export const insert = async (user: any) => {
  const createUser = new Admin({
    username: user.username,
    email: user.email,
    password: user.password,
    name: user.name,
    lastName: user.lastName,
  });

  const saved = await createUser.save();
  if (saved) {
    return { error: false, response: saved };
  }
};

export const items = async () => {
  const items = await Admin.find();
  return items;
};

export const item = async (id: string = "", username: string = "") => {
  const conditions: any[] = [];
  if (id && ObjectId.isValid(id)) {
    conditions.push({ _id: new ObjectId(id) });
  }
  if (username) {
    conditions.push({ username: username });
  }

  const admin = await Admin.findOne({ $or: conditions });
  if (admin) {
    return admin;
  }

  return null;
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
