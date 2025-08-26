import { NextFunction, Request, Response } from "express";
import * as saleService from "../services/sale.service";

export const insert = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sale = req.body;
    if (!sale) {
      return res
        .status(400)
        .send({ success: false, message: "Body is required." });
    }

    const response = await saleService.insert(sale);
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
    const response = await saleService.items();
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
    let saleId = req.query.saleId;
    if (!saleId) {
      return res.send({
        success: false,
        message: "Stock ID cannot be undefined",
      });
    }

    // Ensure stockId is a string
    if (typeof saleId === "string") {
      saleId = saleId;
    } else if (Array.isArray(saleId) && typeof saleId[0] === "string") {
      saleId = saleId[0];
    } else {
      return res
        .status(400)
        .send({ success: false, message: "Invalid stock ID format" });
    }

    const response = await saleService.remove(saleId);
    return res.send({
      success: true,
      response,
    });
  } catch (err) {
    next(err);
  }
};
