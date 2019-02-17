import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { HacksquadMultipleXaxisComponent } from './hacksquard-multiple-xaxis.component';
describe('HacksquadMultipleXaxisComponent', () => {
  let component: HacksquadMultipleXaxisComponent;
  let fixture: ComponentFixture<HacksquadMultipleXaxisComponent>;
  beforeEach(() => {
    const nbThemeServiceStub = {
      getJsTheme: () => ({ subscribe: () => ({}) })
    };
    const httpClientStub = { get: () => ({ subscribe: () => ({}) }) };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HacksquadMultipleXaxisComponent],
      providers: [
        { provide: NbThemeService, useValue: nbThemeServiceStub },
        { provide: HttpClient, useValue: httpClientStub }
      ]
    });
    fixture = TestBed.createComponent(HacksquadMultipleXaxisComponent);
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
      const httpClientStub: HttpClient = fixture.debugElement.injector.get(
        HttpClient
      );
      spyOn(nbThemeServiceStub, 'getJsTheme');
      spyOn(httpClientStub, 'get');
      component.ngAfterViewInit();
      expect(nbThemeServiceStub.getJsTheme).toHaveBeenCalled();
      expect(httpClientStub.get).toHaveBeenCalled();
    });
  });
});
