import { Component, Input, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { TrafficBar } from '../../../../@core/data/traffic-bar';
import { TrafficList } from '../../../../@core/data/traffic-list';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'hacksquad-accind-back-card',
  styleUrls: ['./accind-back-card.component.scss'],
  templateUrl: './accind-back-card.component.html',
})
export class AccIndBackCardComponent implements OnDestroy {

  private alive = true;

  currentTheme: string;
  trafficBarData: TrafficBar = {data: [], labels: [], formatter: ''};
  trafficListData: TrafficList;
  revealed = false;
  period: string = 'week';
  indiaAccidentNumbersInYearwise:any;

  years:any;
  valuesForAllIndia:any;
  barChartData:any;

  constructor(private themeService: NbThemeService,private httpClient:HttpClient) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.indiaAccidentNumbersInYearwise =this.httpClient.get("https://api.data.gov.in/resource/8d6c88bc-2724-487d-85e9-d80577ec1de4?api-key=579b464db66ec23bdd000001c6428902f4a84b325bc2f0be1b919118&format=json").subscribe(res => {
          this.indiaAccidentNumbersInYearwise = res;
          this.years = ['_2003','_2004','_2005','_2006','_2007','_2008','_2009','_2010','__2011'];
          this.valuesForAllIndia = this.indiaAccidentNumbersInYearwise.records[35];
          var dataCorrect = this.valuesForAllIndia['__2011'].split(',');
         this.valuesForAllIndia['__2011'] = dataCorrect[0]+dataCorrect[1];

          const item = {
            data :[],
            labels :[],
            formatter : '{c0} MB',
          }

          for(var i=0;i< this.years.length;i++){

            item.data.push(this.valuesForAllIndia[this.years[i]]);
            item.labels.push(this.years[i]);


          }
          this.trafficBarData= item;



        });

        this.currentTheme = theme.name;
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
