import { NextFunction, Request, Response } from "express";
import * as qrService from "../services/qr.service";
import Shirt from "../models/Shirt";
import { PAGE_URL } from "../config";

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

    const qrDataUrl = await qrService.generateQr(
      `${PAGE_URL}/shirt-visualization/${shirtData.identificator}`
    );
    return res.send({ success: true, response: qrDataUrl });
  } catch (err) {
    next(err);
  }
};
