import Router from "express";
import * as saleController from "../controllers/sale.controller";
const saleRouter = Router();
import handler from "../middlewares/Handler";

saleRouter.post("/", handler(saleController.insert));
saleRouter.get("/", handler(saleController.items));
saleRouter.delete("/", handler(saleController.remove));

export default saleRouter;
