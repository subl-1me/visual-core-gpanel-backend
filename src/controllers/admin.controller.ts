import * as uiid from "uuid";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import * as adminService from "../services/admin.service";

export const insert = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body) {
      res.status(400);
      return res.send({ success: false, message: "Body is required." });
    }

    //TODO: Improve body validation
    const { username, email, password, name, lastName, id } = req.body;
    if (username === "" || email === "" || password === "") {
      return res.status(400).send({
        success: false,
        message: "Body cannot contain empty fields.",
      });
    }

    // find existing user
    const existingUser = await adminService.item(id || "", username, email);
    if (existingUser) {
      return res.status(409).send({
        success: false,
        message: "Username or email already taken.",
      });
    }

    const result = await new Promise((resolve, reject) => {
      // encrypt password
      const saltRounds = 10;
      bcrypt.genSalt(saltRounds, async (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
          // save on db
          const response = await adminService.insert({
            name,
            lastName,
            username,
            email,
            password: hash,
          });

          if (err) {
            reject(err);
          }

          resolve(response);
        });
      });
    });

    return res.status(200).send({
      success: result instanceof Error,
      result,
    });
  } catch (err) {
    next(err);
  }
};

export const items = async (_req: Request, res: Response) => {
  const items = await adminService.items();
  return res.send({ error: false, users: items });
};

export const update = async (req: Request, res: Response) => {
  const { adminId } = req.params;
  if (!adminId) {
    res.status(400);
    return res.send({ error: true, message: "Admin ID is required." });
  }

  const updateResponse = await adminService.update(adminId, req.body);
  return res.send({
    error: updateResponse.error,
    message: updateResponse.response,
    queryResponse: updateResponse.response,
  });
};
