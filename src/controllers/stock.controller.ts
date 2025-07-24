import { Request, Response } from "express";
import * as stockService from "../services/stock.service";
import { ParsedQs } from "qs";

export const insert = async (req: Request, res: Response) => {
  const stock = req.body;
  if (!stock) {
    return res.status(400).send({ error: true, message: "Body is required." });
  }

  const dbResponse = await stockService.insert(stock);
  return res.send({ error: false, dbResponse });
};

export const items = async (req: Request, res: Response) => {
  const stocks = await stockService.items();
  return res.send({ error: false, items: stocks });
};

export const remove = async (req: Request, res: Response) => {
  let stockId = req.query.stock_id;
  if (!stockId) {
    return res.send({ error: true, message: "Stock ID cannot be undefined" });
  }

  // Ensure stockId is a string
  if (typeof stockId === "string") {
    stockId = stockId;
  } else if (Array.isArray(stockId) && typeof stockId[0] === "string") {
    stockId = stockId[0];
  } else {
    return res
      .status(400)
      .send({ error: true, message: "Invalid stock ID format" });
  }

  const dbResponse = await stockService.remove(stockId);
  return res.send({ error: false, dbResponse });
};
