import express from 'express';
import path from 'path';
import fs from 'fs';
import excelFileToJson from '../utils/excelFileToJson';
import dataNormalizer from '../utils/dataNormalizer';
import MetricItemModel from '../models/MetricItemModel';

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
    const listOfFiles: string[] = [];

    fs.readdirSync(path.resolve(__dirname, '../data')).forEach(file => {
        listOfFiles.push(file);
    });


    // console.log('listOfFiles', listOfFiles)
    const rawJson = excelFileToJson(listOfFiles[5]);
    const normalizedData = dataNormalizer(rawJson);
    
    MetricItemModel.insertMany(normalizedData.slice(0, 1))
        .then((res) => console.log('Response', res))
        .catch(err => console.log(err))
        return 'ok'
    // return res.json(JSON.stringify(parsedData, null, 2));
});

export default router;