import { Injectable } from '@angular/core';
import { of as observableOf,  Observable } from 'rxjs';
import { PeriodsService } from './periods.service';
import { TrafficList, TrafficListData } from '../data/traffic-list';
import {HttpClient,HttpHeaders} from '@angular/common/http';

@Injectable()
export class TrafficListService extends TrafficListData {

  private getRandom = (roundTo: number) => Math.round(Math.random() * roundTo);
  private data = {};
  indiaAccidentNumbersInYearwise :any;
  valuesForAllIndia : any;
  years : any;
  checkData:any = [];


  constructor(private period: PeriodsService,private httpClient:HttpClient) {
    super();
    this.data = {
      week: this.getDataWeek(),
      month: this.getDataMonth(),
      year: this.getDataYear(),
    };
  }

  private getDataWeek(): TrafficList[] {
    const getFirstDateInPeriod = () => {
      const weeks = this.period.getWeeks();

      return weeks[weeks.length - 1];
    };

    return this.reduceData(this.period.getWeeks(), getFirstDateInPeriod);
  }

  private getDataMonth(): TrafficList[] {
    const getFirstDateInPeriod = () => {
      const months = this.period.getMonths();
      const date = new Date();
      const prevYear = date.getFullYear() - 1;

      return `${months[months.length - 1]}, ${prevYear}`;
    };

    return this.reduceData(this.period.getMonths(), getFirstDateInPeriod);
  }

  private getDataYear(): TrafficList[] {
    const getFirstDateInPeriod = () => {
      const years = this.period.getYears();

      return `${parseInt(years[0], 10) - 1}`;
    };

    return this.reduceData(this.period.getYears(), getFirstDateInPeriod);
  }

  private reduceData(timePeriods: string[], getFirstDateInPeriod: () => string): TrafficList[] {
    return timePeriods.reduce((result, timePeriod, index) => {
      const hasResult = result[index - 1];
      const prevDate = hasResult ?
        result[index - 1].comparison.nextDate :
        getFirstDateInPeriod();
      const prevValue = hasResult ?
        result[index - 1].comparison.nextValue :
        this.getRandom(100);
      const nextValue = this.getRandom(100);
      const deltaValue = prevValue - nextValue;

      const item = {
        date: timePeriod,
        value: this.getRandom(1000),
        delta: {
          up: deltaValue <= 0,
          value: Math.abs(deltaValue),
        },
        comparison: {
          prevDate,
          prevValue,
          nextDate: timePeriod,
          nextValue,
        },
      };

      return [...result, item];
    }, []);
  }



  getTrafficListData(period: string): Observable<TrafficList> {


    this.indiaAccidentNumbersInYearwise =this.fetchdata().subscribe(res => {
      this.indiaAccidentNumbersInYearwise = res;
      this.years = ['_2003','_2004','_2005','_2006','_2007','_2008','_2009','_2010','__2011'];
      this.valuesForAllIndia = this.indiaAccidentNumbersInYearwise.records[35];
      var dataCorrect = this.valuesForAllIndia['__2011'].split(',');
      this.valuesForAllIndia['__2011'] = dataCorrect[0]+dataCorrect[1];
       for(var i=0;i< this.years.length;i++){

        const items = {
          date: '',
          value: this.getRandom(1000),
          delta: {
            up: false,
            value: 0,
          },
          comparison: {
            nextDate : '',
            nextValue: 0,
            prevDate : '',
            prevValue :0
          },
        }

        items.comparison.nextDate =this.years[i];
        items.comparison.nextValue =this.valuesForAllIndia[this.years[i]];
        if(i ==0){
          items.comparison.prevDate = '__2011';
          items.comparison.prevValue =this.valuesForAllIndia[this.years[this.years.length -1]]
        }else{
          items.comparison.prevDate = this.years[i-1];
          items.comparison.prevValue =this.valuesForAllIndia[this.years[i-1]]
        }
        items.date = this.years[i];
        items.value = this.valuesForAllIndia[this.years[i]];
        if(items.comparison.prevValue > items.comparison.nextValue){
          items.delta.up = false;

          items.delta.value = items.comparison.prevValue - items.comparison.nextValue;
        }else{
          items.delta.up = true;

          items.delta.value = items.comparison.nextValue - items.comparison.prevValue;
        }
        this.checkData.push(items);
       }
    });
    return observableOf(this.checkData);
  }
  fetchdata()
  {
    return this.httpClient.get("https://api.data.gov.in/resource/8d6c88bc-2724-487d-85e9-d80577ec1de4?api-key=579b464db66ec23bdd000001c6428902f4a84b325bc2f0be1b919118&format=json");
  }

}
