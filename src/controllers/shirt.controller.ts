import { NextFunction, Request, Response } from "express";
import * as shirtService from "../services/shirt.service";

export const items = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await shirtService.items();
    return res.send({ success: true, response });
  } catch (err) {
    next(err);
  }
};

export const insert = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const shirt = req.body;
    if (!shirt) {
      return res
        .status(400)
        .send({ success: false, message: "Body is required." });
    }

    const response = await shirtService.insert(shirt);
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
    const { shirtId } = req.params;
    if (!shirtId) {
      return res.status(400).send({
        success: false,
        message: "Shirt ID is required.",
      });
    }

    const response = await shirtService.remove(shirtId);
    return res.send({ success: true, response });
  } catch (err) {
    next(err);
  }
};
