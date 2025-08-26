import { NextFunction, Request, Response } from "express";
import * as customerService from "../services/customer.service";

export const insert = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customer = req.body;
    if (!customer) {
      return res
        .status(400)
        .send({ success: false, message: "Body is required." });
    }

    const response = await customerService.insert(customer);
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
    const { customerId } = req.params;
    if (!customerId) {
      return res
        .status(400)
        .send({ success: false, message: "Customer ID is required." });
    }

    const response = await customerService.remove(customerId);
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
    const dbResponse = await customerService.items();
    return res.send({ error: false, items: dbResponse });
  } catch (err) {
    next(err);
  }
};
