import Router from "express";
const stockRouter = Router();
import * as stockController from "../controllers/stock.controller";
import handler from "../middlewares/Handler";
import upload from "../middlewares/upload";

stockRouter.post(
  "/",
  upload.array("images", 6),
  handler(stockController.insert)
);
stockRouter.get("/", handler(stockController.items));
stockRouter.delete("/", handler(stockController.remove));
stockRouter.get("/:stockId", handler(stockController.item));
stockRouter.put(
  "/:stockId",
  upload.array("images", 6),
  handler(stockController.update)
);

export default stockRouter;
