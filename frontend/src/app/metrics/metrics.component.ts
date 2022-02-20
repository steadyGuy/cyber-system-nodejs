import { Component, OnInit } from '@angular/core';
import { MessageService } from '../messages/message.service';

import { Metric } from '../metric';
import { MetricService } from './metric.service';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss'],
})
export class MetricsComponent implements OnInit {
  metrics: Metric[] = [];
  selectedMetric?: Metric;

  constructor(private metricService: MetricService, private messageService: MessageService) {}

  onSelect(metric: Metric): void {
    this.selectedMetric = metric;
    this.messageService.add(`HeroesComponent: Selected hero id=${metric._id}`);
  }

  getMetrics(): void {
    this.metricService
      .getMetrics()
      .subscribe((metrics) => {
        this.metrics = metrics;
        console.log('METRICS', metrics)
      });
  }

  ngOnInit(): void {
    this.getMetrics();
  }
}
