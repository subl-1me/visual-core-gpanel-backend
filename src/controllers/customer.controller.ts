import { Request, Response } from "express";
import * as customerService from "../services/customer.service";

export const insert = async (req: Request, res: Response) => {
  const customer = req.body;
  if (!customer) {
    return res.status(400).send({ error: true, message: "Body is required." });
  }

  const dbResponse = await customerService.insert(customer);
  return res.send({ error: false, dbResponse });
};

export const remove = () => {};

export const items = async (req: Request, res: Response) => {
  const dbResponse = await customerService.items();
  return res.send({ error: false, items: dbResponse });
};
