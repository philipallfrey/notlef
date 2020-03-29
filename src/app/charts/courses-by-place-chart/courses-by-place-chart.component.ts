import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as ChartDataLabels from 'chartjs-plugin-datalabels';
import { draw } from 'patternomaly';

@Component({
  selector: 'courses-by-place-chart',
  templateUrl: './courses-by-place-chart.component.html',
  styleUrls: ['./courses-by-place-chart.component.css']
})
export class CoursesByPlaceChartComponent implements OnInit {
  @Input() color: string;
  @Input() data: Map<string, number>[];

  public rows = [];
  public maxAxis: number = 0;
  public lineChartData: Record<number, ChartDataSets[]> = {};
  public lineChartLabels: Record<number, Label[]> = {};
  public lineChartOptions: ChartOptions = {
    responsive: true,
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 24,
        bottom: 0
      }
    },
    scales:{
      xAxes:[{
        ticks:{
          fontFamily: 'Spectral'
        },
        gridLines: {
          display: false
        }
      }],
      yAxes:[{
        type: 'logarithmic',
        display: false
      }]
    },
    plugins: {
      // Change options for ALL labels of THIS CHART
      datalabels: {
        font:{
          family: 'Spectral',
          size: 14
        },
      }
    }
  };
  //Change type from Colors[] to any, to allow use of patterns
  public lineChartColors: any[] = [
    {
      borderColor: 'black',
      backgroundColor: 'white',
    },
  ];
  public lineChartLegend = false;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [ChartDataLabels];

  constructor() { }

  ngOnInit() {
    console.log('color', this.color);
    this.findMaxAxis();
    this.setColors();
    this.populateChartData();
  }

  get csvData(): any[] {
    let output = [];
    this.data.forEach( row => {
      row.forEach((count, region) => {
      //Each row in the csv consists of region, courses count
      output.push({ region: region, count: count});
      })
    });
    return output;
  }

  findMaxAxis(): void {
    let max = 0;
    this.data.forEach( (current, year) => {
      const currentMax = Math.max(...current.values());
      max = currentMax > max ? currentMax : max;
    });
    this.maxAxis = max;

    //TODO Update @types to support this option
    //this.lineChartOptions.scales.yAxes[0].max = max;
  }

  setColors(): void {
    this.lineChartColors[0].borderColor = this.color;
    this.lineChartColors[0].backgroundColor = draw('diagonal', 'white', this.color);
  }

  populateChartData(): void {
    for(let row=0; row<this.data.length; row++){
      this.rows.push(row);

      const values = [...this.data[row].values()];
      const pseudoGaussian = values.reduce( (accumulator, current) => {
        accumulator = [...accumulator, 0, current];
        return accumulator;
      }, []);
      const dataLabels = values.reduce( (accumulator, current) => {
        accumulator = [...accumulator, false, true];
        return accumulator;
      }, []);
      this.lineChartData[row] = [
        { data: [...pseudoGaussian, 0],
          datalabels:{
            anchor: 'start',
            align: 'top',
            color: '#333',
            display: [...dataLabels, false],
            rotation: 0,
          },
          label: '',
          pointRadius: 0
        },
        { data: [this.maxAxis], datalabels: {display: [false]}, label: '', pointRadius: 0 }
      ];

      const labels = [...this.data[row].keys()];
      const pseudoLabels = labels.reduce( (accumulator, current) => {
        accumulator = [...accumulator, '', current];
        return accumulator;
      }, []);
      this.lineChartLabels[row] = [...pseudoLabels, ''];
    };

  }


}
