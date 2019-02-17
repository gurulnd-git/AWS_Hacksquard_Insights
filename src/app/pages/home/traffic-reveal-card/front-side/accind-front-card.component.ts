import { Component, Input, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';

import { TrafficList } from '../../../../@core/data/traffic-list';

@Component({
  selector: 'hacksquad-accind-front-card',
  styleUrls: ['./accind-front-card.component.scss'],
  templateUrl: './accind-front-card.component.html',
})
export class TrafficFrontCardComponent implements OnDestroy {

  private alive = true;

  @Input() frontCardData: TrafficList;

  currentTheme: string;

  constructor(private themeService: NbThemeService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
    });
  }


  trackByDate(_, item) {
    return item.date;
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
