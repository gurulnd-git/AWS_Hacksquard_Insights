export interface MultipleAxisChart {
  accVal: any;
  accKey: any;
}

export abstract class MultipleAxisChartData {
  abstract getMultipleAxisChartData(period: string): MultipleAxisChart;
}
