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
