import { Component, OnDestroy } from '@angular/core';
import { ProgressInfo, StatsProgressBarData } from '../../../@core/data/stats-progress-bar';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'hacksquad-progress-section',
  styleUrls: ['./progress-section.component.scss'],
  templateUrl: './progress-section.component.html',
})
export class ProgressSectionComponent implements OnDestroy {

  private alive = true;


  progressInfoData: ProgressInfo[];
  progressKilledData: ProgressInfo[];
  progressInjuredData: ProgressInfo[];


  constructor(private statsProgressBarService: StatsProgressBarData) {
    this.statsProgressBarService.getProgressInfoData()

      .subscribe((data) => {
        this.progressInfoData = data;
      });
      this.statsProgressBarService.getProgressKilledData()

      .subscribe((data) => {
        this.progressKilledData = data;
      });
      this.statsProgressBarService.getProgressInjuredData()

      .subscribe((data) => {
        this.progressInjuredData = data;
      });
  }

  ngOnDestroy() {
    this.alive = true;
  }
}
