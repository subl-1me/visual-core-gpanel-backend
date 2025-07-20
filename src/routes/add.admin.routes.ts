import { Router } from "express";
const adminRouter = Router();
import * as controller from "../controllers/add-admin.controller";

adminRouter.post("/", controller.insert);

export default adminRouter;
