import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { draw } from 'patternomaly';

@Component({
  selector: 'courses-by-year-chart',
  templateUrl: './courses-by-year-chart.component.html',
  styleUrls: ['./courses-by-year-chart.component.css']
})
export class CoursesByYearChartComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [
    { data: [0,1,0,2,0,1,0,0,0,3,0,0], label: 'Series A', pointRadius: 0 },
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novemeber', 'December'];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales:{
      xAxes:[{
        gridLines: {
          display: false
        }
      }],
      yAxes:[{
        display: false
      }]
    }
  };
  //Change type from Colors[] to any, to allow use of patterns
  public lineChartColors: any[] = [
    {
      //borderColor: 'black',
      backgroundColor: draw('diagonal', '#dd5a83'),
    },
  ];
  public lineChartLegend = false;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  constructor() { }

  ngOnInit() {
  }

}
