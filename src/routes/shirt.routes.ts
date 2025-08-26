import Router from "express";
const shirtRouter = Router();
import * as shirtController from "../controllers/shirt.controller";
import handler from "../middlewares/Handler";

shirtRouter.get("/", handler(shirtController.items));
shirtRouter.post("/", handler(shirtController.insert));
shirtRouter.delete("/:shirtId", handler(shirtController.remove));

export default shirtRouter;
