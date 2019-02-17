import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { EchartsLineComponent } from './echarts-line.component';
describe('EchartsLineComponent', () => {
  let component: EchartsLineComponent;
  let fixture: ComponentFixture<EchartsLineComponent>;
  beforeEach(() => {
    const nbThemeServiceStub = {
      getJsTheme: () => ({ subscribe: () => ({}) })
    };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [EchartsLineComponent],
      providers: [{ provide: NbThemeService, useValue: nbThemeServiceStub }]
    });
    fixture = TestBed.createComponent(EchartsLineComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  describe('ngAfterViewInit', () => {
    it('makes expected calls', () => {
      const nbThemeServiceStub: NbThemeService = fixture.debugElement.injector.get(
        NbThemeService
      );
      spyOn(nbThemeServiceStub, 'getJsTheme');
      component.ngAfterViewInit();
      expect(nbThemeServiceStub.getJsTheme).toHaveBeenCalled();
    });
  });
});
