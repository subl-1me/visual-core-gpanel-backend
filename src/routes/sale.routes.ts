import Router from "express";
import * as saleController from "../controllers/sale.controller";
const saleRouter = Router();

saleRouter.post("/", saleController.insert);
saleRouter.get("/", saleController.items);

export default saleRouter;
