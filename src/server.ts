import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
dotenv.config();
const app = express();
import { connectDB } from "./database";
import adminRouter from "./routes/admin.routes";
import loginRouter from "./routes/login.routes";
import shirtRouter from "./routes/shirt.routes";
import stockRouter from "./routes/stock.routes";
import saleRouter from "./routes/sale.routes";
import customerRouter from "./routes/customer.routes";
import handler from "./middlewares/Handler";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

//multer
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use("/api/adm", adminRouter, handler);
app.use("/api/login", loginRouter, handler);
app.use("/api/shirt", shirtRouter, handler);
app.use("/api/stock", stockRouter, handler);
app.use("/api/customer", customerRouter, handler);
app.use("/api/sale", saleRouter, handler);

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
        connectDB();
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
