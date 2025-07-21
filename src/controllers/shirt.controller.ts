import { Request, Response } from "express";
import * as shirtService from "../services/shirt.service";

export const items = async (_req: Request, res: Response) => {
  const response = await shirtService.items();
  return res.status(200).send(response);
};

export const insert = async (req: Request, res: Response) => {
  const { body } = req.body;
  if (!body) {
    return res.status(400).send({ error: true, message: "Body is required." });
  }

  const response = await shirtService.insert(body);
  return res.status(200).send(response);
};
