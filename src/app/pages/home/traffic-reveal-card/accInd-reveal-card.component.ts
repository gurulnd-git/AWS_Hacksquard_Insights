import { Component, OnDestroy } from '@angular/core';
import { TrafficList, TrafficListData } from '../../../@core/data/traffic-list';
import { takeWhile } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'hacksquad-reveal-card',
  styleUrls: ['./accInd-reveal-card.component.scss'],
  templateUrl: './accInd-reveal-card.component.html',
})
export class AccIndRevealCardComponent implements OnDestroy {

  private alive = true;

  trafficListData: TrafficList;
  revealed = false;
  period: string = 'week';
  indiaAccidentNumbersInYearwise:any;

  years:any;
  valuesForAllIndia:any;
  barChartData:any;


  constructor(private trafficListService: TrafficListData, private httpClient:HttpClient) {
    this.getTrafficFrontCardData(this.period);
  }

  toggleView() {
    this.revealed = !this.revealed;
  }

  setPeriodAngGetData(value: string): void {
    this.period = value;

    this.getTrafficFrontCardData(value);
  }


  getTrafficFrontCardData(period: string) {
    this.trafficListService.getTrafficListData(period)
      .pipe(takeWhile(() => this.alive ))
      .subscribe(trafficListData => {
        this.trafficListData = trafficListData;
      });
  }

  fetchdata()
  {
    return this.httpClient.get("https://api.data.gov.in/resource/8d6c88bc-2724-487d-85e9-d80577ec1de4?api-key=579b464db66ec23bdd000001c6428902f4a84b325bc2f0be1b919118&format=json");
  }

  alcoholData(){
    return this.httpClient.get("https://data.gov.in/node/4070981/datastore/export/json");
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
