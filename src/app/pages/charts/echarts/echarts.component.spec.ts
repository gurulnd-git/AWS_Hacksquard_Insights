import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { EchartsComponent } from './echarts.component';
describe('EchartsComponent', () => {
  let component: EchartsComponent;
  let fixture: ComponentFixture<EchartsComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [EchartsComponent]
    });
    fixture = TestBed.createComponent(EchartsComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
