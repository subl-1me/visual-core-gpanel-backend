import Router from "express";
const shirtRouter = Router();
import * as shirtController from "../controllers/shirt.controller";

shirtRouter.get("/", shirtController.items);
shirtRouter.post("/", shirtController.insert);

export default shirtRouter;
