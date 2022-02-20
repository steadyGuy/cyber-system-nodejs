import { Component, OnInit, Input } from '@angular/core';

import { Metric } from '../metric';

@Component({
  selector: 'app-metric-detail',
  templateUrl: './metric-detail.component.html',
  styleUrls: ['./metric-detail.component.scss']
})
export class MetricDetailComponent implements OnInit {

  @Input() metric?: Metric;

  constructor() { }

  ngOnInit(): void {
  }

}
