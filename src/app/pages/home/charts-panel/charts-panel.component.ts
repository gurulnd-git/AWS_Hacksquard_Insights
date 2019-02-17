import { HacksquadMultipleXaxisComponent } from '../../charts/echarts/hacksquard-multiple-xaxis.component';
import { Component, OnDestroy, ViewChild } from '@angular/core';

import { ComparisionChartComponent } from './charts/comparision-chart.component';

@Component({
  selector: 'hacksquad-classification-charts',
  styleUrls: ['./charts-panel.component.scss'],
  templateUrl: './charts-panel.component.html',
})
export class HomeChartsPanelComponent implements OnDestroy {

  period: string = 'week';
  @ViewChild('multipleAxisChart') multipleAxisChart: HacksquadMultipleXaxisComponent;
  @ViewChild('comparisionChart') comparisionChart: ComparisionChartComponent;

  constructor() {
  }


  ngOnDestroy() {
  }
}
