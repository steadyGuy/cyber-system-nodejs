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
  metrics: Metric[] | null = null;
  selectedMetric?: Metric;

  pageStart: number = 0;
  pageEnd: number = 1000;
  pageHeight: number = 100;
  pageBuffer: number = 1000;

  constructor(
    private metricService: MetricService,
    private messageService: MessageService
  ) {}

  onSelect(metric: Metric): void {
    this.selectedMetric = metric;
    this.messageService.add(`HeroesComponent: Selected hero id=${metric._id}`);
  }

  // TODO: Fix any typing
  onScroll(event: Event | any) {
    const scrollTop = event.target.scrollTop;
    const scrollHeight = event.target.scrollHeight;
    const offsetHeight = event.target.offsetHeight;

    const scrollPosition = scrollTop + offsetHeight;
    const scrollTreshold = scrollHeight - this.pageHeight;
    if (scrollPosition > scrollTreshold) {
      this.pageEnd += this.pageBuffer;
    }
  }

  getMetrics(type: string): void {
    this.metricService.getMetrics(type).subscribe((metrics) => {
      this.metrics = metrics;
    });
  }

  deleteMetrics(): void {
    this.metrics = null;
    this.metricService.deleteMetrics().subscribe();
  }

  ngOnInit(): void {
    // this.getMetrics();
  }
}
