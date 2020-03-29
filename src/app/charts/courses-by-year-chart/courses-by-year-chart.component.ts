import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { draw } from 'patternomaly';

@Component({
  selector: 'courses-by-year-chart',
  templateUrl: './courses-by-year-chart.component.html',
  styleUrls: ['./courses-by-year-chart.component.css']
})
export class CoursesByYearChartComponent implements OnInit {
  @Input() color: string;
  @Input() data: Map<number, number[]>;
  @Input() years: number[]; //TODO get from data

  public lineChartData: Record<number, ChartDataSets[]> = {};
  public lineChartLabels: Label[] = ['','JAN', '', 'FEB', '', 'MAR', '', 'APR', '', 'MAY', '', 'JUN', '', 'JUL', '', 'AUG', '', 'SEP', '', 'OCT', '', 'NOV', '', 'DEC', ''];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales:{
      xAxes:[{
        display: false,
        ticks:{
          fontFamily: 'Spectral'
        },
        gridLines: {
          display: false
        }
      }],
      yAxes:[{
        id: 'y-axis-0',
        type: 'linear',
        display: false
      }]
    },
    plugins: {
      // Change options for ALL labels of THIS CHART
      datalabels: {
        display: false,
        font:{
          family: 'Spectral'
        }
      }
    }
  };
  //Change type from Colors[] to any, to allow use of patterns
  //Overridden in this.setColors because input color not available until OnInit
  public lineChartColors: any[] = [
    {
      borderColor: 'black',
      backgroundColor: 'white',
    },
  ];
  public lineChartLegend = false;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];
  private maxAxis: number;

  constructor( ) { }

  ngOnInit() {
    console.log("data", this.data);
    this.setColors();
    this.populateChartData();
  }

  get csvData(): any[] {
    let output = [];
    this.data.forEach( (yearData, year) => {
      //Each row in the csv consists of year, month, courses count
      yearData.forEach( (count, index) => {
        output.push({ year: year, month: index + 1, count: count});
      })
    });
    return output
  }

  getModifiedChartOptions(year: number): ChartOptions {
    const finalYear = this.years[this.years.length - 1];//TODO neater way without using pop?

    if(year === finalYear){
      this.lineChartOptions.scales.xAxes[0].display = true;
    } else {
      this.lineChartOptions.scales.xAxes[0].display = false;
    }
    return this.lineChartOptions;
  }

  get chartData(): Record<number, ChartDataSets[]> {
    return this.populateChartData()
  }

  populateChartData(): Record<number, ChartDataSets[]>{
    this.findMaxAxis(this.data);
    //TODO: Define a new type of bar chart where the bars are Gaussian shapes
    //The following workaround adds an extra zero between data points to get the same effect
    this.data.forEach( (yearData, year) => {
      const pseudoGaussian = yearData.reduce( (accumulator, current) => {
        accumulator = [...accumulator, 0, current];
        return accumulator;
      }, []);
      //Set second dataset with invisible point to keep scales consistent.
      //Workaround for unsupported this.lineChartOptions.scales.yAxes[0].max option
      this.lineChartData[year] = [
        { data: [...pseudoGaussian, 0], label: `${year}`, pointRadius: 0 },
        { data: [this.maxAxis], datalabels:
          { align: 45, display: [true], formatter: function(value, context) {
            return context.dataset.label;
            }
          }, pointRadius: 0, label: `${year}` }];
    })

    return this.lineChartData;
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

  setColors(): void {
    this.lineChartColors[0].borderColor = '';
    this.lineChartColors[0].backgroundColor = this.color;
  }
}
