import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { delay, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'hacksquad-earning-pie-chart',
  styleUrls: ['./earning-card-back.component.scss'],
  template: `
    <div echarts
         class="echart"
         [options]="options"
         (chartInit)="onChartInit($event)"
         (chartClick)="onChartClick($event)">
    </div>
  `,
})
export class EarningPieChartComponent implements AfterViewInit, OnDestroy {

  @Output() selectPie = new EventEmitter<{value: number; name: string; color: string}>();
  @Input() values: {value: number; name: string; }[];
  @Input() defaultSelectedCurrency: string;

  private alive = true;
  pieChartDataForNationalhighway:any;
  pieChartData:any = [];
  pieChartDataForStateHighway:any;

  options: any = {};
  echartsInstance;

  constructor(private theme: NbThemeService,private httpClient :HttpClient) {
  }

  onChartInit(ec) {
    this.echartsInstance = ec;
  }

  onChartClick(event) {
    const pieData = {
      value: event.value,
      name: event.name,
      color: event.color.colorStops[0].color,
    };

    this.emitSelectPie(pieData);
  }

  emitSelectPie(pieData: {value: number; name: string; color: any}) {
    this.selectPie.emit(pieData);
  }

  ngAfterViewInit() {
    this.theme.getJsTheme()
      .pipe(
        takeWhile(() => this.alive),
        delay(1),
      )
      .subscribe(config => {
        const variables = config.variables;

        this.pieChartDataForNationalhighway =this.fetchdataForNationalHighway().subscribe(res => {
          this.pieChartDataForNationalhighway = res;
          this.pieChartData = [];
          var dataManipulation = {
            name: '',
            value:0
          };
          dataManipulation.value = this.pieChartDataForNationalhighway.records[36]['_2015'];
          dataManipulation.name = 'National Highway';
          this.pieChartData.push(dataManipulation);

          this.pieChartDataForStateHighway = this.fetchdataForStateHighway().subscribe(res1 =>{
            this.pieChartDataForStateHighway = res1;
            var dataManipulation1 = {
              name: '',
              value:0
            };
            dataManipulation1.value = this.pieChartDataForStateHighway.records[36]['_2015'];
            dataManipulation1.name = 'State Highway';
            this.pieChartData.push(dataManipulation1);


          this.options = this.getOptions(variables);
          const defaultSelectedData =
            this.options.series[0].data.find((item) => item.name === this.defaultSelectedCurrency);
          const color = defaultSelectedData.itemStyle.normal.color.colorStops[0].color;
          const pieData = {
            value: defaultSelectedData.value,
            name: defaultSelectedData.name,
            color,
          };

          this.emitSelectPie(pieData);

          });

        });



      });






  }




  getOptions(variables) {
    const earningPie: any = variables.earningPie;

    return {
      tooltip: {
        trigger: 'item',
        formatter: '',
      },
      series: [
        {
          name: ' ',
          clockWise: true,
          hoverAnimation: false,
          type: 'pie',
          center: earningPie.center,
          radius: earningPie.radius,
          data: [
            {
              value: this.pieChartData[0].value,
              name: this.pieChartData[0].name,
              label: {
                normal: {
                  position: 'center',
                  formatter: '',
                  textStyle: {
                    fontSize: '22',
                    fontFamily: variables.fontSecondary,
                    fontWeight: '600',
                    color: variables.fgHeading,
                  },
                },
              },
              tooltip: {
                show: false,
              },
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: earningPie.firstPieGradientLeft,
                    },
                    {
                      offset: 1,
                      color: earningPie.firstPieGradientRight,
                    },
                  ]),
                  shadowColor: earningPie.firstPieShadowColor,
                  shadowBlur: 0,
                  shadowOffsetX: 0,
                  shadowOffsetY: 3,
                },
              },
            },
            {
              value: this.pieChartData[1].value,
              name: this.pieChartData[1].name,
              label: {
                normal: {
                  position: 'center',
                  formatter: '',
                  textStyle: {
                    fontSize: '22',
                    fontFamily: variables.fontSecondary,
                    fontWeight: '600',
                    color: variables.fgHeading,
                  },
                },
              },
              tooltip: {
                show: false,
              },
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: earningPie.secondPieGradientLeft,
                    },
                    {
                      offset: 1,
                      color: earningPie.secondPieGradientRight,
                    },
                  ]),
                  shadowColor: earningPie.secondPieShadowColor,
                  shadowBlur: 0,
                  shadowOffsetX: 0,
                  shadowOffsetY: 3,
                },
              },
            },

          ],
        },
      ],
    };
  }



  fetchdataForNationalHighway(){
    return this.httpClient.get("https://api.data.gov.in/resource/254567a3-f5eb-46e3-b1cc-3595911ab88a?api-key=579b464db66ec23bdd000001c6428902f4a84b325bc2f0be1b919118&format=json&offset=0");
  }
  fetchdataForStateHighway(){
    return this.httpClient.get("https://api.data.gov.in/resource/6067d8a3-a132-463d-859d-4832eff36996?api-key=579b464db66ec23bdd000001c6428902f4a84b325bc2f0be1b919118&format=json&offset=0");
  }
  ngOnDestroy() {
    this.alive = false;
  }
}
