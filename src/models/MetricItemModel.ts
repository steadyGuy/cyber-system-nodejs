import mongoose from 'mongoose';
import { IMetricItem } from '../types';

const metricItemSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    temperature: Number,
    windDirection: String,
    windSpeed: Number,
});

export default mongoose.model<IMetricItem>('MetricItem', metricItemSchema);