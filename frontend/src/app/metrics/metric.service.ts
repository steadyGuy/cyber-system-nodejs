import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from '../messages/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Metric } from '../metric';

@Injectable({
  providedIn: 'root',
})
export class MetricService {
  private metricsUrl = 'http://localhost:3000/api/metrics'; // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  getMetrics(): Observable<Metric[]> {
    const metrics = this.http.get<Metric[]>(this.metricsUrl);
    this.log('MetricsService: fetched metrics');
    return metrics;
  }
}
