import Router from "express";
const customerRouter = Router();
import * as customerController from "../controllers/customer.controller";
import handler from "../middlewares/Handler";

customerRouter.post("/", handler(customerController.insert));
customerRouter.get("/", handler(customerController.items));
customerRouter.delete("/:customerId", handler(customerController.remove));

export default customerRouter;
