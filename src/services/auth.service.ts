import bcrypt from "bcrypt";
import { chooseDatabase } from "../database";
import { ENV } from "../config";

export const auth = async (user: any, stored: any) => {
  if (ENV === "development") {
    const hash = stored.password;
    const match = await bcrypt.compare(user.password, hash);
    if (match) {
      const session = {
        username: stored.username,
        email: stored.email,
        id: stored.id,
        pos: stored.pos,
        tkn: null,
      };
      return { error: false, authenticated: true, session };
    }

    return {
      error: true,
      message: "Incorrect password.",
      authenticated: false,
    };
  }
};
