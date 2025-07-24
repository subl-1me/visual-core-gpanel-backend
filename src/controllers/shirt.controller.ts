import { Request, Response } from "express";
import * as shirtService from "../services/shirt.service";

export const items = async (_req: Request, res: Response) => {
  const response = await shirtService.items();
  return res.status(200).send(response);
};

export const insert = async (req: Request, res: Response) => {
  const shirt = req.body;
  console.log(shirt);
  if (!shirt) {
    return res.status(400).send({ error: true, message: "Body is required." });
  }

  const response = await shirtService.insert(shirt);
  return res.status(200).send(response);
};
