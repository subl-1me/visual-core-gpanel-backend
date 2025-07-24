import Router from "express";
const stockRouter = Router();
import * as stockController from "../controllers/stock.controller";

stockRouter.post("/", stockController.insert);
stockRouter.get("/", stockController.items);
stockRouter.delete("/", stockController.remove);

export default stockRouter;
