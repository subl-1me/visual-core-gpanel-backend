import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import * as adminController from "../services/db";

export const authenticate = async (req: Request, res: Response) => {
  const { body } = req;
  if (!body) {
    return res
      .status(400)
      .send({ error: true, message: "Body cannot be undefined." });
  }

  const { username, password } = body;
  if (!username || username === "" || !password || password === "") {
    return res
      .status(400)
      .send({ error: true, message: "Empty fields not allowed." });
  }

  // verify if user exist
  const user = await adminController.item("", username);
  if (!user) {
    return res.status(404).send({ error: false, message: "User not found." });
  }

  // authenticate;
  const authResponse = await authService.auth({ username, password }, user);
  return res.status(200).send({ error: false, authResponse });
};
