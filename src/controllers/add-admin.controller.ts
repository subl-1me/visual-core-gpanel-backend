import * as uiid from "uuid";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import * as adminService from "../services/db";

export const insert = async (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400);
    return res.send({ error: true, message: "Body is required." });
  }

  //TODO: Improve body validation
  const { username, email, password } = req.body;
  if (username === "" || email === "" || password === "") {
    res.status(400);
    return res.send({
      error: true,
      mesage: "Fields cannot be empty. Please, check them again.",
    });
  }

  // encrypt password
  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, async (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      // generate uuid & save on db
      let newId = uiid.v7();
      const response = await adminService.insert({
        newId,
        username,
        email,
        password: hash,
      });

      res.status(201);
      return res.send({ error: false, message: "User created successfully." });
    });
  });
};

export const items = async (_req: Request, res: Response) => {
  const items = await adminService.items();
  return res.send({ error: false, items });
};

export const update = async (req: Request, res: Response) => {
  const { adminId } = req.params;
  console.log(adminId);
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
