import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ChartjsLineComponent } from './chartjs-line.component';
describe('ChartjsLineComponent', () => {
  let component: ChartjsLineComponent;
  let fixture: ComponentFixture<ChartjsLineComponent>;
  beforeEach(() => {
    const nbThemeServiceStub = {
      getJsTheme: () => ({ subscribe: () => ({}) })
    };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ChartjsLineComponent],
      providers: [{ provide: NbThemeService, useValue: nbThemeServiceStub }]
    });
    fixture = TestBed.createComponent(ChartjsLineComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
