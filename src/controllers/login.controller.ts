import { NextFunction, Request, Response } from "express";
import * as authService from "../services/auth.service";
import * as adminController from "../services/admin.service";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    if (!body) {
      return res
        .status(400)
        .send({ success: false, message: "Body cannot be undefined." });
    }

    const { username, password } = body;
    if (!username || username === "" || !password || password === "") {
      return res
        .status(400)
        .send({ success: false, message: "Empty fields not allowed." });
    }

    // verify if user exist
    const user = await adminController.item("", username);
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found." });
    }

    // authenticated;
    const response = await authService.auth({ username, password }, user);
    return res.send({ success: true, response });
  } catch (err) {
    next(err);
  }
};
