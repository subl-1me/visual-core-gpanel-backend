import Router from "express";
const customerRouter = Router();
import * as customerController from "../controllers/customer.controller";

customerRouter.post("/", customerController.insert);
customerRouter.get("/", customerController.items);
customerRouter.delete("/:customerId", customerController.remove);

export default customerRouter;
