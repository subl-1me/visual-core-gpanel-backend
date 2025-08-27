import { NextFunction, Request, Response } from "express";
import * as stockService from "../services/stock.service";
import { isValidObjectId } from "mongoose";

export const insert = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const stock = req.body;
    if (!stock) {
      return res
        .status(400)
        .send({ success: false, message: "Body is required." });
    }

    const response = await stockService.insert(stock);
    return res.send({ success: true, response });
  } catch (err) {
    next(err);
  }
};

export const items = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await stockService.items();
    return res.send({ success: true, response });
  } catch (err) {
    next(err);
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let stockId = req.query.stock_id;
    if (!stockId) {
      return res.status(400).send({
        success: false,
        message: "Stock ID cannot be undefined.",
      });
    }

    // Ensure stockId is a string
    if (typeof stockId === "string") {
      stockId = stockId;
    } else if (Array.isArray(stockId) && typeof stockId[0] === "string") {
      stockId = stockId[0];
    } else {
      return res
        .status(400)
        .send({ success: false, message: "Invalid stock ID format." });
    }

    if (!isValidObjectId(stockId)) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid stock ID format." });
    }

    const response = await stockService.remove(stockId);
    return res.send({ success: true, response });
  } catch (err) {
    next(err);
  }
};
