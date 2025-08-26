import { Router } from "express";
const adminRouter = Router();
import * as controller from "../controllers/admin.controller";
import handler from "../middlewares/Handler";

adminRouter.post("/", handler(controller.insert));
adminRouter.get("/", handler(controller.items));
adminRouter.get("/", handler(controller.item));
adminRouter.put("/:adminId", handler(controller.update));

export default adminRouter;
