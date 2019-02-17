import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ChartjsMultipleXaxisComponent } from './chartjs-multiple-xaxis.component';
describe('ChartjsMultipleXaxisComponent', () => {
  let component: ChartjsMultipleXaxisComponent;
  let fixture: ComponentFixture<ChartjsMultipleXaxisComponent>;
  beforeEach(() => {
    const nbThemeServiceStub = {
      getJsTheme: () => ({ subscribe: () => ({}) })
    };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ChartjsMultipleXaxisComponent],
      providers: [{ provide: NbThemeService, useValue: nbThemeServiceStub }]
    });
    fixture = TestBed.createComponent(ChartjsMultipleXaxisComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
