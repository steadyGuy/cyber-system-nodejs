import translations, {
  translationsCode,
  translationsStrings,
} from "../translations";
import { IMetricItem, RawJson } from "../types";
import interpolate from "../utils/interpolate";

const dataNormalizer = ({ data, dataDate }: RawJson, interpolation: string) => {
  let parsedData: IMetricItem[] = [];

  parsedData = data.map((itm, i) => {
    const month =
      itm["Число месяца"].length > 1
        ? itm["Число месяца"]
        : `0${itm["Число месяца"]}`;
    const time = itm["UTC"].length > 4 ? itm["UTC"] : `0${itm["UTC"]}`;

    const fillGap = (template: "FF" | "dd" | "T") => {
      const isDD = template === "dd";
      let prev = data[i - 1]?.[template];
      let next = data[i + 1]?.[template];

      if (isDD && prev) {
        prev = translationsCode[prev];
      }

      if (isDD && next) {
        next = translationsCode[next];
      }

      if (prev === undefined) {
        let prevIdx = i;
        while (prevIdx >= 0) {
          prev = isDD
            ? translationsCode[data[prevIdx--][template]]
            : data[prevIdx--][template];
        }
        if (prev === undefined) prev = 0;
      }

      if (next === undefined) {
        let nextIdx = i;
        while (nextIdx < data.length) {
          next = isDD
            ? translationsCode[data[nextIdx++][template]]
            : data[nextIdx++][template];
        }
        if (next === undefined) next = 8;
      }

      return Math.round(interpolate(interpolation, prev, next));
    };

    return {
      date: new Date(`${dataDate}-${month}T${time}:00Z`),
      temperature: itm["T"] === undefined ? fillGap("T") : Number(itm["T"]),
      windDirection:
        itm["dd"] === undefined
          ? translations[translationsStrings[fillGap("dd")]]
          : translations[itm["dd"]],
      windSpeed: itm["FF"] === undefined ? fillGap("FF") : Number(itm["FF"]),
    };
  });

  return parsedData;
};

export default dataNormalizer;
