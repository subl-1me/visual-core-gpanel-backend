import { NextFunction, Request, Response } from "express";
import * as qrService from "../services/qr.service";
import Shirt from "../models/Shirt";

export const getQr = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { identificator } = req.params;
    if (!identificator) {
      res.status(400).json({ message: "Identificator is required." });
    }

    const shirtData = await Shirt.findOne({
      identificator: {
        $regex: new RegExp(`^${identificator.trim()}$`, "i"),
      },
    });
    if (!shirtData) {
      throw new Error("Shirt not found");
    }

    const textPayload = JSON.stringify(shirtData);
    const qrBuffer = await qrService.generateQr(textPayload);
    res.set("Content-Type", "image/png");
    res.send(qrBuffer);
  } catch (err) {
    next(err);
  }
};
