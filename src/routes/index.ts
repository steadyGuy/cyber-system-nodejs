import express from "express";
import path from "path";
import fs from "fs";
import excelFileToJson from "../utils/excelFileToJson";
import dataNormalizer from "../utils/dataNormalizer";
import MetricItemModel from "../models/MetricItemModel";
import { IMetricItem } from "../types";
const router = express.Router();

router.get("/metrics", (req: express.Request, res: express.Response) => {
  const listOfFiles: string[] = [];

  fs.readdirSync(path.resolve(__dirname, "../data")).forEach((file) => {
    listOfFiles.push(file);
  });

  MetricItemModel.countDocuments({}).then((count) => {
    if (count > 100) {
      MetricItemModel.find({}).then((data) => res.json(data));
    } else {
      let allData: IMetricItem[] = [];
      listOfFiles.forEach((fileName) => {
        const rawJson = excelFileToJson(fileName);
        const normalizedData = dataNormalizer(rawJson, req.query.interpolation as string || 'linear');
        allData = allData.concat(normalizedData);
        return;
      });

      MetricItemModel.insertMany(
        allData.sort(
          (metricA, metricB) => metricA.date.getTime() - metricB.date.getTime()
        )
      )
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          res.status(500).json({ error: err });
          console.log(err);
        });
    }
  });
});

router.delete("/metrics", (req: express.Request, res: express.Response) => {
  MetricItemModel.deleteMany({})
    .then(() => res.json({ data: "Successfully deleted!" }))
    .catch((err) => res.status(500).json({ data: "Something went wrong" }));
});

export default router;
