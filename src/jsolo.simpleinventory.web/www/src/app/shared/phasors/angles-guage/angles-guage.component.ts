import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'ngx-angles-guage',
  template: `
    <div echarts [options]='opts' class='echart'
         (chartInit)="onChartInit($event)">
    </div>
  `,
  styleUrls: ['./angles-guage.component.scss'],
})
export class AnglesGuageComponent implements OnInit, OnChanges {

  @Input() angles: { value: number, name: string }[];
  @Input() colors: string[] = [ '#ba0c0c', '#e6fb03', '#5a5ff9', '#a8385d', '#aae3f5' ];

  chartInstance;
  opts: any;


  constructor() { }

  ngOnInit(): void {
    this.opts = {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}°',
      },
    };
  }


  ngOnChanges(): void {
    if (this.chartInstance) {
      this.chartInstance.setOption({

        series: [{
          // colorBy: 'data',
          name: 'Voltage Angle',
          type: 'gauge',
          axisLine: {
            lineStyle: {
              width: 10,
              color: [[1, '#d3d3d3']],
            },
          },
          axisTick: {
            distance: -10,
            length: 10,
            lineStyle: {
              color: '#000',
              width: 2,
            },
          },
          splitLine: {
            distance: -10,
            length: 20,
            lineStyle: {
              color: '#000',
              width: 4,
            },
          },
          axisLabel: {
            // distance: -45,
            color: '#000',
            //   show: false,
          },
          min: 0,
          max: 360,
          startAngle: 90,
          endAngle: -269,
          progress: {
            show: false,
          },
          title: {
            show: false,
          },
          detail: {
            show: false,
            // valueAnimation: true,
            // formatter: '{value}'
          },
          data: this.angles.map((angle, i) => {
            return {
              name: angle.name,
              value: angle.value,
              itemStyle: { color: this.colors[i] },
            };
          }),
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
