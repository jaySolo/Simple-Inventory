export interface ReportLineGraphData {
  ledgend: string[];
  series: ReportLineGraphSeries[];
}

export interface ReportLineGraphSeries {
  // index: number;
  name: string;
  data: { timestamp: Date | string, value: number }[];
}
