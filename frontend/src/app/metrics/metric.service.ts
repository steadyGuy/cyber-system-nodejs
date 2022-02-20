import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from '../messages/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Metric } from '../metric';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MetricService {
  private metricsUrl = `${environment.apiURL}/api/metrics`; // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /**
   * Handle Http operation that failed.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  getMetrics(interpolation: string): Observable<Metric[]> {
    const metrics = this.http
      .get<Metric[]>(this.metricsUrl, {
        params: {
          interpolation,
        },
      })
      .pipe(
        tap((_) => this.log('fetched metrics')),
        catchError(this.handleError<Metric[]>())
      );
    return metrics;
  }

  deleteMetrics(): Observable<Metric[]> {
    const metrics = this.http.delete<Metric[]>(this.metricsUrl).pipe(
      tap((_) => this.log('delete metrics')),
      catchError(this.handleError<Metric[]>())
    );
    return metrics;
  }
}
