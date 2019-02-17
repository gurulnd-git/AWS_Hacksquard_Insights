import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { LayoutService } from '../../../../@core/utils/layout.service';
import { TrafficBarChartComponent } from './accind-bar-chart.component';
describe('TrafficBarChartComponent', () => {
  let component: TrafficBarChartComponent;
  let fixture: ComponentFixture<TrafficBarChartComponent>;
  beforeEach(() => {
    const nbThemeServiceStub = {
      getJsTheme: () => ({ pipe: () => ({ subscribe: () => ({}) }) })
    };
    const layoutServiceStub = {
      onChangeLayoutSize: () => ({ pipe: () => ({ subscribe: () => ({}) }) })
    };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [TrafficBarChartComponent],
      providers: [
        { provide: NbThemeService, useValue: nbThemeServiceStub },
        { provide: LayoutService, useValue: layoutServiceStub }
      ]
    });
    spyOn(TrafficBarChartComponent.prototype, 'resizeChart');
    fixture = TestBed.createComponent(TrafficBarChartComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  describe('constructor', () => {
    it('makes expected calls', () => {
      expect(TrafficBarChartComponent.prototype.resizeChart).toHaveBeenCalled();
    });
  });
  describe('ngAfterViewInit', () => {
    it('makes expected calls', () => {
      const nbThemeServiceStub: NbThemeService = fixture.debugElement.injector.get(
        NbThemeService
      );
      spyOn(nbThemeServiceStub, 'getJsTheme');
      component.ngAfterViewInit();
      expect(nbThemeServiceStub.getJsTheme).toHaveBeenCalled();
    });
  });
});
