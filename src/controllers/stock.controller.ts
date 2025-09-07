import { NextFunction, Request, Response } from "express";
import * as stockService from "../services/stock.service";
import { isValidObjectId } from "mongoose";
import * as cloudinaryService from "../services/cloudinary.service";

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
              ? await cloudinaryService.upload(
                  file.path,
                  `${response._id}-coverImg-${new Date().getTime()}`
                )
              : await cloudinaryService.upload(
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
        details.media = uploads
          .filter((response) => response.success)
          .map((value) => {
            return {
              public_id: value.result?.public_id || "",
              url: value.result?.url || "",
            };
          });
      }

      const update = await stockService.update(response.id, {
        details,
      });
    }

    return res.send({ success: true, response });
  } catch (err) {
    next(err);
  }
};

export const item = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { stockId } = req.params;
    if (!stockId) {
      return res
        .status(400)
        .send({ success: false, message: "Stock ID is required." });
    }

    const response = await stockService.item(stockId);
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

    const stock = await stockService.item(stockId);
    if (!stock) {
      return res
        .status(400)
        .send({ success: false, message: "Stock not found." });
    }

    // first update basic data
    const stockPayload = JSON.parse(req.body.stockPayload);
    const mediaToRemove = JSON.parse(req.body.toDelete);
    const response = await stockService.update(stockId, stockPayload);
    let newCoverFromUploads = {
      public_id: "",
      url: "",
    };

    // upload new images & update if there is new cover
    const newCover = req.body.newCoverFromUploads;
    let update;

    // new files
    const files = req.files as Array<any>;
    if (files && files.length > 0) {
      const uploadPromises = files.map(async (file: any, index: number) => {
        try {
          let result;
          if (file.originalname === newCover) {
            result = await cloudinaryService.upload(
              file.path,
              `${stockId}-coverImg-${new Date().getTime()}`
            );
          } else {
            result = await cloudinaryService.upload(
              file.path,
              `${stockId}-gallery-${index}-${new Date().getTime()}`
            );
          }
          return { success: true, result };
        } catch (error) {
          return {
            success: false,
            fileName: file.originalname,
            error:
              error instanceof Error ? error.message : "Error uploading image",
          };
        }
      });

      const uploads = await Promise.all(uploadPromises).then((result) => {
        const newCoverimage = result.find(
          (response) =>
            response.success && response.result?.public_id.includes("coverImg")
        );
        if (newCoverimage) {
          (newCoverFromUploads.public_id =
            newCoverimage.result?.public_id || ""),
            (newCoverFromUploads.url = newCoverimage.result?.url || "");
        }

        return result;
      });

      let details = response
        ? response.details
        : ((await stockService.item(stockId)) || {}).details;

      if (details) {
        details.media = [
          ...details.media,
          ...uploads
            .filter((response) => response.success)
            .map((value) => {
              return {
                public_id: value.result?.public_id || "",
                url: value.result?.url || "",
              };
            }),
        ];

        const itemIndex = details.media.findIndex(
          (media) => media.public_id === newCoverFromUploads.public_id
        );
        if (itemIndex < 0) {
          update = await stockService.update(stockId, {
            details,
          });
        } else {
          const [item] = details.media.splice(itemIndex, 1);
          details.media.splice(0, 0, item);
          update = await stockService.update(stockId, {
            details,
          });
        }
      }
    }

    // delete removed media
    if (mediaToRemove && mediaToRemove.length > 0) {
      const removedPromises = mediaToRemove.map(async (media: string) => {
        try {
          const result = await cloudinaryService.remove(media);
          return { success: true, result };
        } catch (err: any) {
          return {
            success: false,
            error:
              err instanceof Error
                ? err.message
                : `Error removing media: ${err.message}`,
          };
        }
      });

      const removedResponses = await Promise.all(removedPromises);
      stock.details.media = stock.details.media.filter(
        (media) => !mediaToRemove.includes(media.public_id)
      );
      update = await stockService.update(stockId, stock);
    }

    return res.send({ success: true, response, update });
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

    const stock = await stockService.item(stockId);
    if (!stock) {
      return res
        .status(400)
        .send({ success: false, message: "Stock not found." });
    }
    const response = await stockService.remove(stockId);

    // remove gallery
    const media = stock.details.media;
    if (media && media.length > 0) {
      const removePromises = media.map(async (media) => {
        try {
          const result = await cloudinaryService.remove(media.public_id);
          return { success: true, result };
        } catch (err: any) {
          console.log(err);
          return {
            success: false,
            error:
              err instanceof Error
                ? err.message
                : `Error removing media: ${err.message}`,
          };
        }
      });

      const results = await Promise.all(removePromises);
    }

    return res.send({ success: true, response });
  } catch (err) {
    next(err);
  }
};
