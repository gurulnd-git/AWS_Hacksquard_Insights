import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChartjsComponent } from './chartjs.component';
describe('ChartjsComponent', () => {
  let component: ChartjsComponent;
  let fixture: ComponentFixture<ChartjsComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ChartjsComponent]
    });
    fixture = TestBed.createComponent(ChartjsComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
