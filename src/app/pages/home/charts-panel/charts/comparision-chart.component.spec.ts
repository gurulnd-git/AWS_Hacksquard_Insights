import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { LayoutService } from '../../../../@core/utils/layout.service';
import { HttpClient } from '@angular/common/http';
import { ComparisionChartComponent } from './comparision-chart.component';
describe('ComparisionChartComponent', () => {
  let component: ComparisionChartComponent;
  let fixture: ComponentFixture<ComparisionChartComponent>;
  beforeEach(() => {
    const nbThemeServiceStub = {
      getJsTheme: () => ({ pipe: () => ({ subscribe: () => ({}) }) })
    };
    const layoutServiceStub = {
      onChangeLayoutSize: () => ({ pipe: () => ({ subscribe: () => ({}) }) })
    };
    const httpClientStub = { get: () => ({}) };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ComparisionChartComponent],
      providers: [
        { provide: NbThemeService, useValue: nbThemeServiceStub },
        { provide: LayoutService, useValue: layoutServiceStub },
        { provide: HttpClient, useValue: httpClientStub }
      ]
    });
    spyOn(ComparisionChartComponent.prototype, 'resizeChart');
    fixture = TestBed.createComponent(ComparisionChartComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('roadAccData defaults to: []', () => {
    expect(component.roadAccData).toEqual([]);
  });
  it('roadAccDataInMH defaults to: []', () => {
    expect(component.roadAccDataInMH).toEqual([]);
  });
  it('roadAccDataInKarnataka defaults to: []', () => {
    expect(component.roadAccDataInKarnataka).toEqual([]);
  });
  describe('constructor', () => {
    it('makes expected calls', () => {
      expect(
        ComparisionChartComponent.prototype.resizeChart
      ).toHaveBeenCalled();
    });
  });
  describe('ngAfterViewInit', () => {
    it('makes expected calls', () => {
      const nbThemeServiceStub: NbThemeService = fixture.debugElement.injector.get(
        NbThemeService
      );
      spyOn(component, 'fetchdata');
      spyOn(component, 'setOptions');
      spyOn(nbThemeServiceStub, 'getJsTheme');
      component.ngAfterViewInit();
      expect(component.fetchdata).toHaveBeenCalled();
      expect(component.setOptions).toHaveBeenCalled();
      expect(nbThemeServiceStub.getJsTheme).toHaveBeenCalled();
    });
  });
  describe('fetchdata', () => {
    it('makes expected calls', () => {
      const httpClientStub: HttpClient = fixture.debugElement.injector.get(
        HttpClient
      );
      spyOn(httpClientStub, 'get');
      component.fetchdata();
      expect(httpClientStub.get).toHaveBeenCalled();
    });
  });
});
