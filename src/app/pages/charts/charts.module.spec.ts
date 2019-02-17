import { TestBed } from '@angular/core/testing';
import { ChartsModule } from './charts.module';
describe('ChartsModule', () => {
  let pipe: ChartsModule;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ChartsModule] });
    pipe = TestBed.get(ChartsModule);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
