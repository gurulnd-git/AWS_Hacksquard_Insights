import { AfterViewInit, Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { LayoutService } from '../../../../@core/utils/layout.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'hacksquad-comparision-chart',
  styleUrls: ['./charts-common.component.scss'],
  template: `
    <div echarts [options]="options" class="echart" (chartInit)="onChartInit($event)"></div>
  `,
})
export class ComparisionChartComponent implements AfterViewInit, OnDestroy, OnChanges {

  private alive = true;
  indiaAccidentNumbersInYearwise: any;

  echartsIntance: any;
  options: any = {};
  roadAccData : any = [];
  roadAccDataInMH: any = [];
  roadAccDataInKarnataka :any = [];

  constructor(private theme: NbThemeService,
              private layoutService: LayoutService , private httpClient :HttpClient) {
    this.layoutService.onChangeLayoutSize()
      .pipe(
        takeWhile(() => this.alive),
      )
      .subscribe(() => this.resizeChart());
  }

  ngOnChanges(): void {


  }

  ngAfterViewInit() {
    let indiaAccidentNumbersInYearwise: any;

    this.theme.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(config => {
        const eTheme: any = config.variables.profit;

        this.indiaAccidentNumbersInYearwise =this.fetchdata().subscribe(res => {

          indiaAccidentNumbersInYearwise = res;
          this.roadAccData = [];
          this.roadAccDataInMH = [];
          this.roadAccDataInKarnataka = [];
          let constant = 0;
          let constant1 = 0;
          let constant2 = 0;

          for (var key in indiaAccidentNumbersInYearwise.records[32]) {
            if(constant>1) {
              if(key == '__2011'){
                var dataCorrect = indiaAccidentNumbersInYearwise["records"][32]["__2011"].split(',');
                indiaAccidentNumbersInYearwise.records[32]['__2011'] = dataCorrect[0]+dataCorrect[1];
               }
              this.roadAccData.push(indiaAccidentNumbersInYearwise.records[32][key])
            }
            constant++;
         }
          for (var key in indiaAccidentNumbersInYearwise.records[14]) {
            if(constant1>1) {
              if(key == '__2011'){
                var dataCorrect = indiaAccidentNumbersInYearwise["records"][14]["__2011"].split(',');
                indiaAccidentNumbersInYearwise.records[14]['__2011'] = dataCorrect[0]+dataCorrect[1];
               }
              this.roadAccDataInMH.push(indiaAccidentNumbersInYearwise.records[14][key])
            }
            constant1++;
         }

         for (var key in indiaAccidentNumbersInYearwise.records[11]) {
          if(constant2>1) {
            if(key == '__2011'){
              var dataCorrect = indiaAccidentNumbersInYearwise["records"][11]["__2011"].split(',');
              indiaAccidentNumbersInYearwise.records[11]['__2011'] = dataCorrect[0]+dataCorrect[1];
             }
            this.roadAccDataInKarnataka.push(indiaAccidentNumbersInYearwise.records[11][key])
          }
          constant2++;
       }




        this.setOptions(eTheme);
        });
      });
  }

  setOptions(eTheme) {
    this.options = {
      backgroundColor: eTheme.bg,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          shadowStyle: {
            color: 'rgba(0, 0, 0, 0.3)',
          },
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: ['2003','2004','2005','2006','2007','2008','2009','2010','2011'],
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            lineStyle: {
              color: eTheme.axisLineColor,
            },
          },
          axisLabel: {
            color: eTheme.axisTextColor,
            fontSize: eTheme.axisFontSize,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: eTheme.axisLineColor,
            },
          },
          splitLine: {
            lineStyle: {
              color: eTheme.splitLineColor,
            },
          },
          axisLabel: {
            color: eTheme.axisTextColor,
            fontSize: eTheme.axisFontSize,
          },
        },
      ],
      series: [
        {
          name: 'DELHI',
          type: 'bar',
          barGap: 0,
          barWidth: '20%',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: eTheme.firstLineGradFrom,
              }, {
                offset: 1,
                color: eTheme.firstLineGradTo,
              }]),
            },
          },
          data: this.roadAccData,
        },
        {
          name: 'MAHARASHTRA',
          type: 'bar',
          barWidth: '20%',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: eTheme.secondLineGradFrom,
              }, {
                offset: 1,
                color: eTheme.secondLineGradTo,
              }]),
            },
          },
          data: this.roadAccDataInMH,
        },
        {
          name: 'KARNATAKA',
          type: 'bar',
          barWidth: '20%',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: eTheme.thirdLineGradFrom,
              }, {
                offset: 1,
                color: eTheme.thirdLineGradTo,
              }]),
            },
          },
          data: this.roadAccDataInKarnataka,
        },
      ],
    };
  }


  getNewSeries(series, data: number[][]) {
    return series.map((line, index) => {
      return {
        ...line,
        data: data[index],
      };
    });
  }

  onChartInit(echarts) {
    this.echartsIntance = echarts;
  }

  resizeChart() {
    if (this.echartsIntance) {
      // Fix recalculation chart size
      // TODO: investigate more deeply
      setTimeout(() => {
        this.echartsIntance.resize();
      }, 0);
    }
  }
  fetchdata()
  {
    return this.httpClient.get("https://api.data.gov.in/resource/8d6c88bc-2724-487d-85e9-d80577ec1de4?api-key=579b464db66ec23bdd000001c6428902f4a84b325bc2f0be1b919118&format=json");
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
