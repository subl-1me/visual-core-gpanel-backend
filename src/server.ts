import express from "express";
import cors from "cors";
import helmet from "helmet";
const app = express();
import { chooseDatabase } from "./database";
import adminRouter from "./routes/add.admin.routes";
import loginRouter from "./routes/login.routes";
import shirtRouter from "./routes/shirt.routes";
import stockRouter from "./routes/stock.routes";
import saleRouter from "./routes/sale.routes";
import customerRouter from "./routes/customer.routes";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use("/api/adm", adminRouter);
app.use("/api/login", loginRouter);
app.use("/api/shirt", shirtRouter);
app.use("/api/stock", stockRouter);
app.use("/api/customer", customerRouter);
app.use("/api/sale", saleRouter);

import { PORT, TEST_URL, ENV } from "./config";

export default class Server {
  static start() {
    try {
      app.listen(PORT, (err) => {
        if (err) {
          throw new Error(`Failed to start server: ${err.message}`);
        }

        console.log(`Server is running on ${TEST_URL}.`);
        console.log(`Initializing database... Current: ${ENV}`);
        chooseDatabase();
      });
    } catch (error) {
      throw new Error(
        `Error starting server: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  static getApp() {
    return app;
  }
}
