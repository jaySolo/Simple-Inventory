import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'ngx-magnitude-bars',
  template: `
    <div echarts [options]='opts' class='echart'
         (chartInit)="onChartInit($event)">
    </div>
  `,
  styleUrls: ['./magnitude-bars.component.scss'],
})
export class MagnitudeBarsComponent implements OnInit, OnChanges {

  @Input() magnitudes: { value: number, name: string }[];
  @Input() unit: string = 'unit';
  @Input() minimumInterval: number = 0.1;
  @Input() maximumInterval: number = 1.0;
  @Input() measurment: string = 'Measurement:';
  @Input() colors: string[] = [ '#ba0c0c', '#e6fb03', '#5a5ff9', '#a8385d', '#aae3f5'];

  chartInstance;
  opts: any;


  constructor() { }

  ngOnInit(): void {
    this.opts = {
      tooltip: {
        formatter: `<b style="font-style:italic;">{a}</b><br/>{b}: <b>{c} ${this.unit}</b>`,
      },
      yAxis: {
        type: 'category',
        data: this.magnitudes.map(m => {
          return m.name;
        }),
      },
      xAxis: {
        name: this.unit,
        type: 'value',
        boundaryGap: ['20%', '20%'],
        min: function (val: any) {
          return Math.floor(val.min) - Math.round((val.max - val.min) / 3);
        },
        max: function (val: any) {
          return Math.ceil(val.max) + Math.round((val.max - val.min) / 3);
        },
        minInterval: this.minimumInterval,
        maxInterval: this.maximumInterval,
        splitLine: { show: true },
      },
    };
  }


  ngOnChanges(): void {
    if (this.chartInstance) {
      this.chartInstance.setOption({
        series: [{
          name: this.measurment,
          data: this.magnitudes.map((m, i) => {
            return {
              value: m.value,
              itemStyle: { color: this.colors[i] },
            };
          }),
          type: 'bar',
          animation: true,
        }],
      });
    } else {
      console.warn('no e-chart instance available', this.chartInstance);
    }
  }


  onChartInit(ec) {
    this.chartInstance = ec;
  }
}
