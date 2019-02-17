import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { EchartsBarAnimationComponent } from './echarts-bar-animation.component';
describe('EchartsBarAnimationComponent', () => {
  let component: EchartsBarAnimationComponent;
  let fixture: ComponentFixture<EchartsBarAnimationComponent>;
  beforeEach(() => {
    const nbThemeServiceStub = {
      getJsTheme: () => ({ subscribe: () => ({}) })
    };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [EchartsBarAnimationComponent],
      providers: [{ provide: NbThemeService, useValue: nbThemeServiceStub }]
    });
    fixture = TestBed.createComponent(EchartsBarAnimationComponent);
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
