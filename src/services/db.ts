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
