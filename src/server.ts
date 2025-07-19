import express from "express";
import cors from "cors";
import helmet from "helmet";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

import { PORT, TEST_URL } from "./config";

export default class Server {
  static start() {
    app.listen(PORT, (err) => {
      if (err) {
        throw new Error(`Failed to start server: ${err.message}`);
      }

      console.log(`Server is running on ${TEST_URL}`);
    });
  }

  static getApp() {
    return app;
  }
}
