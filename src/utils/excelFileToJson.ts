import * as xlsx from 'xlsx';
import path from 'path';

const excelFileToJson = (filePath: string) => {
    const workbook = xlsx.readFile(path.resolve(__dirname, `../data/${filePath}`));
    const sheetNames = workbook.SheetNames;

    // we have only one sheet per file
    const tempData: any[] = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]], { raw: false, });
    tempData.shift();

    return {data: tempData, dataDate: filePath.slice(0, 7).replace(/(\w)\./, '0$1')};
}

export default excelFileToJson;