import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { draw } from 'patternomaly';

@Component({
  selector: 'courses-by-place-chart',
  templateUrl: './courses-by-place-chart.component.html',
  styleUrls: ['./courses-by-place-chart.component.css']
})
export class CoursesByPlaceChartComponent implements OnInit {

  @Input() data: Map<string, number>[];
  @Input() color: string;

  public rows = [];
  public maxAxis: number = 0;
  public lineChartData: Record<number, ChartDataSets[]> = {};
  public lineChartLabels: Record<number, Label[]> = {};
  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales:{
      xAxes:[{
        gridLines: {
          display: false
        }
      }],
      yAxes:[{
        type: 'logarithmic',
        display: false
      }]
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
  public lineChartPlugins = [];

  constructor() { }

  ngOnInit() {
    console.log('color', this.color);
    this.findMaxAxis();
    this.setColors();
    this.populateChartData();
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
      this.lineChartData[row] = [
        { data: [...pseudoGaussian,0], label: '', pointRadius: 0 },
        { data: [this.maxAxis], label: '', pointRadius: 0 }
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