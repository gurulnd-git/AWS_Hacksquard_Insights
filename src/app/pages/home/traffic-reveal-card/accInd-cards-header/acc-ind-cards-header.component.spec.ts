import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccIndCardsHeaderComponent } from './accind-cards-header.component';

describe('AccIndCardsHeaderComponent', () => {
  let component: AccIndCardsHeaderComponent;
  let fixture: ComponentFixture<AccIndCardsHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccIndCardsHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccIndCardsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
