import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import routes from "../routes";
import bodyParser from "body-parser";

export const createServer = () => {
  const app = express();

  app.disable("x-powered-by");
  app.use(morgan("dev"));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/", routes);

  app.get("/health", (req: Request, res: Response) => {
    res.json({ ok: true });
  });

  return app;
};
