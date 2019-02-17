import { Observable } from 'rxjs';

export interface ProgressInfo {
  title: string;
  value: number;
  activeProgress: number;
  description: string;
}

export abstract class StatsProgressBarData {
  abstract getProgressInfoData(): Observable<ProgressInfo[]>;
  abstract getProgressKilledData(): Observable<ProgressInfo[]>;
  abstract getProgressInjuredData(): Observable<ProgressInfo[]>;
}
