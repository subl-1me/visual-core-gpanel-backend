import { NextFunction, Request, Response } from "express";
import * as stockService from "../services/stock.service";
import { isValidObjectId } from "mongoose";
import { upload } from "../services/cloudinary.service";

export const insert = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const stock = JSON.parse(req.body.stockPayload);
    if (!stock) {
      return res
        .status(400)
        .send({ success: false, message: "Body is required." });
    }

    const response = await stockService.insert(stock);

    // upload images
    const files = req.files as Array<any>;
    if (files && files.length > 0) {
      const uploadPromises = files.map(async (file: any, index: number) => {
        try {
          const result =
            index === 0
              ? await upload(
                  file.path,
                  `${response._id}-coverImg-${new Date().getTime()}`
                )
              : await upload(
                  file.path,
                  `${response._id}-gallery-${index}-${new Date().getTime()}`
                );
          return { success: true, result };
        } catch (error) {
          console.log(error);
          return {
            success: false,
            fileName: file.originalname,
            error:
              error instanceof Error ? error.message : "Error uploading image",
          };
        }
      });

      const uploads = await Promise.all(uploadPromises);
      // update stock media
      let details = response.details ? response.details : null;
      if (details) {
        details.media = [...uploads.map((value) => value.result?.url || "")];
      }

      const update = await stockService.update(response.id, {
        details,
      });

      console.log(update);
    }

    return res.send({ success: true, response });
  } catch (err) {
    next(err);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { stockId } = req.params;
    if (!stockId) {
      return res
        .status(400)
        .send({ success: false, message: "Stock ID is required." });
    }
    const data = req.body;
    const response = await stockService.update(stockId, data);
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
