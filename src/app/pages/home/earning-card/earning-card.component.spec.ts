import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningCardComponent } from './earning-card.component';

describe('EarningCardComponent', () => {
  let component: EarningCardComponent;
  let fixture: ComponentFixture<EarningCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EarningCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EarningCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
