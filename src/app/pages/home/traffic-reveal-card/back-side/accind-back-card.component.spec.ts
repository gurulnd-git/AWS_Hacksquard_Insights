import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { AccIndBackCardComponent } from './accind-back-card.component';
describe('AccIndBackCardComponent', () => {
  let component: AccIndBackCardComponent;
  let fixture: ComponentFixture<AccIndBackCardComponent>;
  beforeEach(() => {
    const nbThemeServiceStub = {
      getJsTheme: () => ({ pipe: () => ({ subscribe: () => ({}) }) })
    };
    const httpClientStub = { get: () => ({ subscribe: () => ({}) }) };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AccIndBackCardComponent],
      providers: [
        { provide: NbThemeService, useValue: nbThemeServiceStub },
        { provide: HttpClient, useValue: httpClientStub }
      ]
    });
    fixture = TestBed.createComponent(AccIndBackCardComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('revealed defaults to: false', () => {
    expect(component.revealed).toEqual(false);
  });
  it('period defaults to: week', () => {
    expect(component.period).toEqual('week');
  });
});
