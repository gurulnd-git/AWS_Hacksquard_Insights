import { TestBed } from '@angular/core/testing';
import { ChartsRoutingModule } from './charts-routing.module';
describe('ChartsRoutingModule', () => {
  let pipe: ChartsRoutingModule;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ChartsRoutingModule] });
    pipe = TestBed.get(ChartsRoutingModule);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
