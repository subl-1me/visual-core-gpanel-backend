import { Router } from "express";
const loginRouter = Router();
import * as loginController from "../controllers/login.controller";

loginRouter.post("/", loginController.authenticate);

export default loginRouter;
