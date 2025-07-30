import { Request, Response } from "express";
import * as saleService from "../services/sale.service";

export const insert = async (req: Request, res: Response) => {
  const sale = req.body;
  if (!sale) {
    return res.status(400).send({ error: true, message: "Body is required." });
  }

  const response = await saleService.insert(sale);
  return res.send({ error: false, response });
};

export const items = async (req: Request, res: Response) => {
  const items = await saleService.items();
  return res.send({ error: false, items });
};
