import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TrafficBarComponent } from './accind-bar.component';
describe('TrafficBarComponent', () => {
  let component: TrafficBarComponent;
  let fixture: ComponentFixture<TrafficBarComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [TrafficBarComponent]
    });
    fixture = TestBed.createComponent(TrafficBarComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
