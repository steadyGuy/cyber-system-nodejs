import translations from '../translations'
import { IMetricItem, RawJson } from '../types';

const dataNormalizer = ({ data, dataDate }: RawJson) => {
    let parsedData: IMetricItem[] = [];

    parsedData = data.map((itm, i) => {
        const month = itm['Число месяца'].length > 1 ? itm['Число месяца'] : `0${itm['Число месяца']}`;
        const time = itm['UTC'].length > 4 ? itm['UTC'] : `0${itm['UTC']}`

        return {
            date: new Date(`${dataDate}-${month}T${time}:00Z`),
            temperature: itm['T'] === undefined ? 9999 : Number(itm['T']),
            windDirection: itm['dd'] === undefined ? 'unknown' : translations[itm['dd']],
            windSpeed: Number(itm['FF'])
        };
        
    });

    return parsedData;
}

export default dataNormalizer;