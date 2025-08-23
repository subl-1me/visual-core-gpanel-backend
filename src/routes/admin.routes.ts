import { Router } from "express";
const adminRouter = Router();
import * as controller from "../controllers/admin.controller";
import handler from "../middlewares/Handler";

adminRouter.post("/", handler(controller.insert));
adminRouter.get("/", controller.items);
adminRouter.put("/:adminId", controller.update);

export default adminRouter;
