import { Component, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { MultipleAxisChart } from '../../../@core/data/echartsMultipleXaxisChart';

@Component({
  selector: 'hacksquad-multiple-xaxis',
  template: `
    <div echarts [options]='options' style="height:500px !important" class="echart"></div>
  `,
})
export class HacksquadMultipleXaxisComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;
  roadAccidentData: MultipleAxisChart = { accKey: [], accVal: []};

  constructor(private theme: NbThemeService, private httpClient: HttpClient) {

  }

  ngAfterViewInit() {
    let injuredData: any = [];
    let killedData: any = [];
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      let dataAccidents: any;
      this.httpClient.get('https://api.data.gov.in/resource/8d6c88bc-2724-487d-85e9-d80577ec1de4?'
      + 'api-key=579b464db66ec23bdd000001c6428902f4a84b325bc2f0be1b919118&format=json').subscribe(
        res => {

          dataAccidents = res;
          const accKey = [];
          const accVal = [];
          let constant = 0;
          for (var key in dataAccidents.records[35]) {
            if(constant>1) {
              accKey.push(key);
              accVal.push(dataAccidents.records[35][key])
            }
            constant++;
         }

         this.roadAccidentData = {
          accKey : accKey,
          accVal: accVal,
         };

          let dataInjured: any;
          this.httpClient.get('https://api.data.gov.in/resource/1e1f68f2-f66c-40c6-99b6-f8cde1108bb3?'
          + 'api-key=579b464db66ec23bdd000001c6428902f4a84b325bc2f0be1b919118&format=json&offset=0').subscribe(
          res1 => {

            dataInjured = res1;

            injuredData = [];

            let constant1 = 0;
            for (var key in dataInjured.records[35]) {
              if(constant1>1) {
                injuredData.push(dataInjured.records[35][key])
              }
              constant1++;
           }

            let dataKilled: any;
            this.httpClient.get('https://api.data.gov.in/resource/1e1f68f2-f66c-40c6-99b6-f8cde1108bb3?'
            + 'api-key=579b464db66ec23bdd000001c6428902f4a84b325bc2f0be1b919118&format=json&offset=0').subscribe(
            res2 => {
              dataKilled = res2;
              killedData = [];

              let constant2 = 0;
              for (var key in dataKilled.records[35]) {
                if(constant2>1) {
                  killedData.push(dataKilled.records[35][key])
                }
                constant2++;
             }

           const colors: any = config.variables;
           const echarts: any = config.variables.echarts;

           this.options = {
             backgroundColor: echarts.bg,
             color: [colors.success, colors.dangerLight, colors.info, colors.primaryLight],
             tooltip: {
               trigger: 'none',
               axisPointer: {
                 type: 'cross',
               },
             },
             legend: {
               data: ['Vechicles Sold', 'Road Accidents' , 'Persons Injured', 'Person Killed'],
               textStyle: {
                 color: echarts.textColor,
               },
             },
             grid: {
               top: 70,
               bottom: 50,
             },
             xAxis: [
               {
                 type: 'category',
                 axisTick: {
                   alignWithLabel: true,
                 },
                 axisLine: {
                   onZero: false,
                   lineStyle: {
                     color: colors.info,
                   },
                 },
                 axisLabel: {
                   textStyle: {
                     color: echarts.textColor,
                   },
                 },
                 axisPointer: {
                   label: {
                     formatter: params => {
                       return (
                         'Precipitation  ' + params.value + (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                       );
                     },
                   },
                 },
                 data:  this.roadAccidentData.accKey,
               },
               {
                 type: 'category',
                 axisTick: {
                   alignWithLabel: true,
                 },
                 axisLine: {
                   onZero: false,
                   lineStyle: {
                     color: colors.success,
                   },
                 },
                 axisLabel: {
                   textStyle: {
                     color: echarts.textColor,
                   },
                 },
                 axisPointer: {
                   label: {
                     formatter: params => {
                       return (
                         'Precipitation  ' + params.value + (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                       );
                     },
                   },
                 },
                 data: [
                 ],
               },
             ],
             yAxis: [
               {
                 type: 'value',
                 axisLine: {
                   lineStyle: {
                     color: echarts.axisLineColor,
                   },
                   yScaleMin : 10000
                 },
                 splitLine: {
                   lineStyle: {
                     color: echarts.splitLineColor,
                   },
                 },
                 axisLabel: {
                   textStyle: {
                     color: echarts.textColor,
                   },
                   yScaleMin : 10000
                 },
               },
             ],
             series: [
               {
                 name: 'Vechicles Sold',
                 type: 'line',
                 xAxisIndex: 1,
                 smooth: true,
                 data: [200.6, 500.9, 900.0, 2600.4, 2800.7, 7900.7, 7500.6, 10200.2, 48000.7, 18000.8, 6888.0, 9992.4],
               },
               {
                 name: 'Road Accidents',
                 type: 'line',
                 xAxisIndex: 1,
                 smooth: true,
                 data: this.roadAccidentData.accVal,
               },
               {
                 name: 'Persons Injured',
                 type: 'line',
                 xAxisIndex: 1,
                 smooth: true,
                 data: injuredData,
               },
               {
                 name: 'Person Killed',
                 type: 'line',
                 smooth: true,
                 data: killedData,
               },
             ],
           };
            });
           });
          });
        });
  }



  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
