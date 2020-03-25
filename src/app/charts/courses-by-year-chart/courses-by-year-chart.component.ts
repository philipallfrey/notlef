import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { draw } from 'patternomaly';
import { CoursesViewDataService } from '../../services/courses-view-data.service';

@Component({
  selector: 'courses-by-year-chart',
  templateUrl: './courses-by-year-chart.component.html',
  styleUrls: ['./courses-by-year-chart.component.css']
})
export class CoursesByYearChartComponent implements OnInit {
  @Input() years: number[];

  public lineChartData: Record<number, ChartDataSets[]> = {};
  public lineChartLabels: Label[] = ['','Jan', '', 'Feb', '', 'Mar', '', 'Apr', '', 'May', '', 'Jun', '', 'Jul', '', 'Aug', '', 'Sep', '', 'Oct', '', 'Nov', '', 'Dec', ''];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales:{
      xAxes:[{
        display: false,
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
        display: false,
        font:{
          family: 'Nimbus Sans L'
        },
      }
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
  private maxAxis: number;

  constructor( private coursesViewDataService: CoursesViewDataService) { }

  ngOnInit() {
    const data: Map<number, number[]> = this.coursesViewDataService.getCoursesByYearAndMonth(this.years);
    this.populateChartData(data);
    this.findMaxAxis(data);
  }

  populateChartData(data: Map<number, number[]>){
    //TODO: Define a new type of bar chart where the bars are Gaussian shapes
    //The following workaround adds an extra zero between data points to get the same effect
    data.forEach( (yearData, year) => {
      const pseudoGaussian = yearData.reduce( (accumulator, current) => {
        accumulator = [...accumulator, 0, current];
        return accumulator;
      }, []);
      //Set second dataset with invisible point to keep scales consistent.
      //Workaround for unsupported this.lineChartOptions.scales.yAxes[0].max option
      this.lineChartData[year] = [{ data: [...pseudoGaussian, 0], label: `${year}`, pointRadius: 0 },{data: [this.maxAxis], pointRadius: 0, label: ''}];
    })
  }

  findMaxAxis(data: Map<number, number[]>): void{
    let max = 0;
    data.forEach( (current, year) => {
      console.log(year, current);
      const currentMax = Math.max(...current);
      max = currentMax > max ? currentMax : max;
    });
    this.maxAxis = max;

    //TODO Update @types to support this option
    //this.lineChartOptions.scales.yAxes[0].max = max;
  }
}
