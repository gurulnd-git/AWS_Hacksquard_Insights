import { Component } from '@angular/core';

@Component({
  selector: 'hacksquad-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <hacksquad-sample-layout>
      <router-outlet></router-outlet>
    </hacksquad-sample-layout>
  `,
})
export class PagesComponent {}
