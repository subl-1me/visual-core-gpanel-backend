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

export const remove = async (req: Request, res: Response) => {
  let saleId = req.query.saleId;
  if (!saleId) {
    return res.send({ error: true, message: "Stock ID cannot be undefined" });
  }

  // Ensure stockId is a string
  if (typeof saleId === "string") {
    saleId = saleId;
  } else if (Array.isArray(saleId) && typeof saleId[0] === "string") {
    saleId = saleId[0];
  } else {
    return res
      .status(400)
      .send({ error: true, message: "Invalid stock ID format" });
  }

  const response = await saleService.remove(saleId);
  return res
    .status(200)
    .send({ error: false, message: "Sale deteled successfully.", response });
};
