import { Component, OnDestroy } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'hacksquad-chartjs-bar',
  template: `
    <chart style='height:500px' type="bar" [data]="data" [options]="options"></chart>
  `,
})
export class ChartjsBarComponent implements OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService, private httpClient: HttpClient) {

    let tempAcc: any = [];
    let tempAcc1: any = [];
    let dataAccidents: any = [];
    let dataSpeedAccidents: any = [];
    let finaldataSet :any = [];

    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
// State/UT wise Number of Accidents caused due to Intake of Alcohol/Drugs by drivers during 2006-16
  this.httpClient.get('https://data.gov.in/node/4070961/datastore/export/json').subscribe(
  res => {

    this.httpClient.get('https://data.gov.in/node/4071021/datastore/export/json').subscribe(
      res1 => {
        dataSpeedAccidents=[];
        tempAcc1 = res1;
        for (var i=0;i< tempAcc1.data.length;i++) {
          let temp = [];
          let v = tempAcc1.data[i];
            for(var j=0;j < v.length-2;j++){


              temp.push(
                tempAcc1.data[i][j+1]
                );
              }
              dataSpeedAccidents.push(
              {
                state: tempAcc1.data[i][0],
                speedDetailsOfYearwise : temp
              });

            }


            tempAcc = res;
        dataAccidents = [];


        for (var i=0;i< tempAcc.data.length;i++) {
        let temp = [];
        let v = tempAcc.data[i];
        let count = 0;
          for(var j=0;j < v.length-1;j++){

            if(count > 2) {
              temp.push(
                tempAcc.data[i][j+1]
                );
            }
            count++;
            }
            dataAccidents.push(
              {
                state: tempAcc.data[i][0],
                alcoholDetailsOfYearwise : temp
              });
          }
          console.log(dataAccidents)
          const colors: any = config.variables;
          const chartjs: any = config.variables.chartjs;
          finaldataSet = [];
          for (var i=0;i< dataAccidents.length;i++) {
              finaldataSet.push(
                {
                  data: dataAccidents[i].alcoholDetailsOfYearwise,
                  label: dataAccidents[i].state,
                  backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0.8),
                }
              );
              finaldataSet.push(
                {
                  data: dataSpeedAccidents[i].speedDetailsOfYearwise,
                  label: dataSpeedAccidents[i].state,
                  backgroundColor: NbColorHelper.hexToRgbA(colors.infoLight, 0.8),
                }
              );
          }
          this.data = {
            labels: ['2008', '2009', '2010', '2011', '2012','2013','2014','2015'],
            datasets : finaldataSet,

          };

          this.options = {
            maintainAspectRatio: false,
            responsive: true,
            legend: {
              labels: {
                fontColor: chartjs.textColor,
              },
            },
            scales: {
              xAxes: [
                {
                  gridLines: {
                    display: false,
                    color: chartjs.axisLineColor,
                  },
                  ticks: {
                    fontColor: chartjs.textColor,
                  },
                },
              ],
              yAxes: [
                {
                  gridLines: {
                    display: true,
                    color: chartjs.axisLineColor,
                  },
                  ticks: {
                    fontColor: chartjs.textColor,
                  },
                },
              ],
            },
          };

        });
      });

    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
