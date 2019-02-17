import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';

import { ThemeModule } from '../../@theme/theme.module';

import { ChartsRoutingModule, routedComponents } from './charts-routing.module';
import { ChartjsBarComponent } from './chartjs/chartjs-bar.component';
import { ChartjsLineComponent } from './chartjs/chartjs-line.component';
import { ChartjsPieComponent } from './chartjs/chartjs-pie.component';
import { ChartjsMultipleXaxisComponent } from './chartjs/chartjs-multiple-xaxis.component';
import { EchartsLineComponent } from './echarts/echarts-line.component';
import { EchartsPieComponent } from './echarts/echarts-pie.component';
import { EchartsBarComponent } from './echarts/echarts-bar.component';
import { HacksquadMultipleXaxisComponent } from './echarts/hacksquard-multiple-xaxis.component';
import { EchartsBarAnimationComponent } from './echarts/echarts-bar-animation.component';

const components = [
  ChartjsBarComponent,
  ChartjsLineComponent,
  ChartjsPieComponent,
  ChartjsMultipleXaxisComponent,
  EchartsLineComponent,
  EchartsPieComponent,
  EchartsBarComponent,
  HacksquadMultipleXaxisComponent,
  EchartsBarAnimationComponent,
];

@NgModule({
  imports: [ThemeModule, ChartsRoutingModule, NgxEchartsModule, NgxChartsModule, ChartModule],
  declarations: [...routedComponents, ...components],
  exports: [ChartjsBarComponent,
    ChartjsLineComponent,
    ChartjsPieComponent,
    ChartjsMultipleXaxisComponent,
    EchartsLineComponent,
    EchartsPieComponent,
    EchartsBarComponent,
    HacksquadMultipleXaxisComponent,
    EchartsBarAnimationComponent,]
})
export class ChartsModule {}
