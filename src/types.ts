export type RawJson = {
    data: any[],
    dataDate: string;
};

export type IMetricItem = {
    date: Date;
    temperature: number;
    windDirection: string;
    windSpeed: number;
};