import Router from "express";
import handler from "../middlewares/Handler";
const qrRouter = Router();
import * as qrController from "../controllers/qr.controller";

qrRouter.get("/:identificator", handler(qrController.getQr));

export default qrRouter;
