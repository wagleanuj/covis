import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import knex from "./knex";
import { DataUtils, TABLE_NAMES } from "./DataUtils";
import { json } from "body-parser";
dotenv.config();

DataUtils.createTable().then(() => {
  const app: Express = express();
  app.use(json({}));

  const port = process.env.PORT;
  const WWW = path.join(__dirname, "../../../app/www");

  app.use(express.static(WWW));

  app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(WWW, "./index.html"));
  });

  app.post("/line", async (req: Request, res: Response) => {
    const body = req.body;
    const { compareA, compareB, metric } = body;
    knex(TABLE_NAMES.DATA)
      .select(metric, "iso_code", "date")
      .where("iso_code", "=", compareA)
      .orWhere("iso_code", "=", compareB)
      .then((r) => res.send(r));
  });

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
});
