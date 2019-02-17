import { AccIndRevealCardComponent } from './traffic-reveal-card/accInd-reveal-card.component';
import { ChartsModule } from '../charts/charts.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ThemeModule } from '../../@theme/theme.module';
import { HomeComponent } from './home.component';
import { HomeChartsPanelComponent } from './charts-panel/charts-panel.component';
import { ComparisionChartComponent } from './charts-panel/charts/comparision-chart.component';
import { ChartPanelHeaderComponent } from './charts-panel/chart-panel-header/chart-panel-header.component';
import { ChartModule } from 'angular2-chartjs';
import { TrafficBarComponent } from './traffic-reveal-card/front-side/accind-bar/accind-bar.component';
import { TrafficFrontCardComponent } from './traffic-reveal-card/front-side/accind-front-card.component';
import { AccIndBackCardComponent } from './traffic-reveal-card/back-side/accind-back-card.component';
import { TrafficBarChartComponent } from './traffic-reveal-card/back-side/accind-bar-chart.component';
import { ProgressSectionComponent } from './progress-section/progress-section.component';
import { SlideOutComponent } from './slide-out/slide-out.component';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { EarningCardComponent } from './earning-card/earning-card.component';
import { EarningCardBackComponent } from './earning-card/back-side/earning-card-back.component';
import { EarningPieChartComponent } from './earning-card/back-side/earning-pie-chart.component';
import { EarningCardFrontComponent } from './earning-card/front-side/earning-card-front.component';
import { EarningLiveUpdateChartComponent } from './earning-card/front-side/earning-live-update-chart.component';
import { AccIndCardsHeaderComponent } from './traffic-reveal-card/accInd-cards-header/accInd-cards-header.component';

@NgModule({
  imports: [
    ThemeModule,
    ChartModule,
    ChartsModule,
    NgxEchartsModule,
    NgxChartsModule,
    LeafletModule,
  ],
  declarations: [
    HomeComponent,
    HomeChartsPanelComponent,
    ChartPanelHeaderComponent,
    ComparisionChartComponent,
    AccIndRevealCardComponent,
    TrafficBarChartComponent,
    TrafficFrontCardComponent,
    AccIndBackCardComponent,
    TrafficBarComponent,
    AccIndCardsHeaderComponent,
    ProgressSectionComponent,
    SlideOutComponent,
    EarningCardComponent,
    EarningCardFrontComponent,
    EarningCardBackComponent,
    EarningPieChartComponent,
    EarningLiveUpdateChartComponent,
  ],
  providers: [
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class HomeModule { }
