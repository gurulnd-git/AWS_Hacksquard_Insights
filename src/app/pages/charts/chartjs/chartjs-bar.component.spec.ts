import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { ChartjsBarComponent } from './chartjs-bar.component';
describe('ChartjsBarComponent', () => {
  let component: ChartjsBarComponent;
  let fixture: ComponentFixture<ChartjsBarComponent>;
  beforeEach(() => {
    const nbThemeServiceStub = {
      getJsTheme: () => ({ subscribe: () => ({}) })
    };
    const httpClientStub = { get: () => ({ subscribe: () => ({}) }) };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ChartjsBarComponent],
      providers: [
        { provide: NbThemeService, useValue: nbThemeServiceStub },
        { provide: HttpClient, useValue: httpClientStub }
      ]
    });
    fixture = TestBed.createComponent(ChartjsBarComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
