import { ChartPanelHeaderComponent } from './charts-panel/chart-panel-header/chart-panel-header.component';
import { HacksquadMultipleXaxisComponent } from './../charts/echarts/hacksquard-multiple-xaxis.component';
import { AccIndBackCardComponent } from './traffic-reveal-card/back-side/accind-back-card.component';
import { TrafficFrontCardComponent } from './traffic-reveal-card/front-side/accind-front-card.component';
import { EarningCardBackComponent } from './earning-card/back-side/earning-card-back.component';
import { EarningCardFrontComponent } from './earning-card/front-side/earning-card-front.component';
import { ChartjsBarComponent } from './../charts/chartjs/chartjs-bar.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccIndRevealCardComponent } from './traffic-reveal-card/accInd-reveal-card.component';
import { HomeComponent } from './home.component';
import { HomeChartsPanelComponent } from './charts-panel/charts-panel.component';
import { ProgressSectionComponent } from './progress-section/progress-section.component';
import { EarningCardComponent } from './earning-card/earning-card.component';
import { ThemeModule } from '../../@theme/theme.module';
import { AccIndCardsHeaderComponent } from './traffic-reveal-card/accInd-cards-header/accInd-cards-header.component';
fdescribe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent,
        EarningCardComponent,
        HacksquadMultipleXaxisComponent,
        AccIndRevealCardComponent,
        HomeChartsPanelComponent,
        ChartjsBarComponent,
        AccIndBackCardComponent,
        ChartPanelHeaderComponent,
        ProgressSectionComponent,
        EarningCardFrontComponent,
        EarningCardBackComponent,
        AccIndCardsHeaderComponent,
        TrafficFrontCardComponent ],

        imports: [ ThemeModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
