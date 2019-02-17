import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { ProgressInfo, StatsProgressBarData } from '../data/stats-progress-bar';
import {HttpClient,HttpHeaders} from '@angular/common/http';


@Injectable()
export class StatsProgressBarService extends StatsProgressBarData {
  causeOfAccidentsAnfNumbers:any;
  objForTotalTypes :any;
  values:any;
  totalNumberOfAccidents:any;
  arrayOfData:any;

  constructor(private httpClient:HttpClient) {
    super();
  }


  private progressInfoData: ProgressInfo[] = [];
  private progressKilledData: ProgressInfo[] = [];
  progressInjuredData: ProgressInfo[] = [];
  keyValuesForData:number;



  getTypesOfAccidents(){
    return this.httpClient.get("https://api.data.gov.in/resource/38bb7585-582c-404e-950e-592093e57c17?api-key=579b464db66ec23bdd000001c6428902f4a84b325bc2f0be1b919118&format=json&offset=0");
    }

  getProgressInfoData(): Observable<ProgressInfo[]> {

    this.causeOfAccidentsAnfNumbers =this.getTypesOfAccidents().subscribe(res => {
      this.causeOfAccidentsAnfNumbers = res;

      this.objForTotalTypes = this.causeOfAccidentsAnfNumbers.records[35];
      this.values = Object.keys(this.objForTotalTypes);
      var j = 0;

      this.totalNumberOfAccidents = this.getCount(0);

      for(var i = 0;i<this.values.length;i++){

        if(j == 3){
          j=0;
        }
        const item = {
          title: '',
          value: 0,
          activeProgress: 50,
          description: '',
        };
        if(i ==0){

        }else{
          item.value = this.objForTotalTypes[this.values[i]];
          var newLine = this.values[i].replace(/_/g, ' ');

          item.title = newLine.split('total no of road accidents due to')[1];
          item.activeProgress = (item.value / this.totalNumberOfAccidents) *100;
          if(j==0){
            this.progressInfoData.push(item);
          }

          j++;
        }


      }




  });
  return observableOf(this.progressInfoData);
}

getProgressKilledData(): Observable<ProgressInfo[]> {


  this.causeOfAccidentsAnfNumbers =this.getTypesOfAccidents().subscribe(res => {
    this.causeOfAccidentsAnfNumbers = res;

    this.objForTotalTypes = this.causeOfAccidentsAnfNumbers.records[35];
    this.values = Object.keys(this.objForTotalTypes);
    var j = 0;

    this.totalNumberOfAccidents = this.getCount(1);

    for(var i = 0;i<this.values.length;i++){

      if(j == 3){
        j=1;
      }
      const item = {
        title: '',
        value: 0,
        activeProgress: 50,
        description: '',
      };
      if(i ==0){

      }else{
        item.value = this.objForTotalTypes[this.values[i]];
        var newLine = this.values[i].replace(/_/g, ' ');

        item.title = newLine.split('due to')[1];
        item.activeProgress = (item.value / this.totalNumberOfAccidents) *100;
        if(j==1){
          this.progressKilledData.push(item);
        }

        j++;
      }


    }




});

return observableOf(this.progressKilledData);

}

getProgressInjuredData():  Observable<ProgressInfo[]>{


  this.causeOfAccidentsAnfNumbers =this.getTypesOfAccidents().subscribe(res => {
    this.causeOfAccidentsAnfNumbers = res;

    this.objForTotalTypes = this.causeOfAccidentsAnfNumbers.records[35];
    this.values = Object.keys(this.objForTotalTypes);
    var j = 0;

    this.totalNumberOfAccidents = this.getCount(2);

    for(var i = 0;i<this.values.length;i++){

      if(j == 3){
        j=2;
      }
      const item = {
        title: '',
        value: 0,
        activeProgress: 50,
        description: '',
      };
      if(i ==0){

      }else{
        item.value = this.objForTotalTypes[this.values[i]];
        var newLine = this.values[i].replace(/_/g, ' ');
        newLine.split('due to')[1];
        item.title = item.title = newLine;
        item.activeProgress = (item.value / this.totalNumberOfAccidents) *100;
        if(j==2){
          this.progressInjuredData.push(item);
        }

        j++;
      }


    }




});




  return observableOf(this.progressInjuredData);

}



getCount(keyValuesForData){
  var increment = 0;
  var totalNumber = 0;
  for(var k=0;k<this.values.length;k++){
    if(increment ==3){
      increment =0;
    }
     if(k >0){
        if(increment == keyValuesForData){
          totalNumber = Number(totalNumber) + Number(this.objForTotalTypes[this.values[k]]);
        }
        increment++;
     }
  }
  return totalNumber;

}

};
