import { Router } from "express";
const adminRouter = Router();
import * as controller from "../controllers/admin.controller";

adminRouter.post("/", controller.insert);
adminRouter.get("/", controller.items);
adminRouter.put("/:adminId", controller.update);

export default adminRouter;
