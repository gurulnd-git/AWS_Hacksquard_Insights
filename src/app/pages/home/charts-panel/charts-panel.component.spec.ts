import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeChartsPanelComponent } from './charts-panel.component';

describe('HomeChartsPanelComponent', () => {
  let component: HomeChartsPanelComponent;
  let fixture: ComponentFixture<HomeChartsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeChartsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeChartsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
