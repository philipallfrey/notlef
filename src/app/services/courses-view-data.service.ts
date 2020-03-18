import { Injectable } from '@angular/core';
import { ICourseData } from '../models/ICourseData';
import { IDataListEntry } from '../models/IDataListEntry';
import { ILongestCourse } from '../models/ILongestCourse';
import { INamedIdentifierWithCount } from '../models/INamedIdentifierWithCount';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesViewDataService {
  readonly ENDPOINT: string = '/courses/index';
  readonly now: Date = new Date();
  public hasData = false;
  data: ICourseData[] = [];
  languagesWithCounts: INamedIdentifierWithCount[] = [];

  constructor(private apiService: ApiService) {
    this.apiService.getData(this.ENDPOINT).subscribe( data => {
      console.log("received data");
      this.hasData = true;
      this.data = data as ICourseData[];
      this.groupByLanguages();
    });
  }

  getCourseTitles( limit: number ): IDataListEntry[] {
    let titles: IDataListEntry[] = this.data
    .sort((a, b) => b.updated > a.updated ? 1 : (b.updated === a.updated ? 0 : -1) )
    .map( current => {
      const newEntry: IDataListEntry = {
        text: current.name,
        meta: this.getYear(current.updated) //A couple of entries have no created date
      }
      return newEntry;
    });

    titles = titles.slice(0, limit);
    return titles;
  }

  getYear(date: string): number {
    return +date.slice(0,4);
  }

  getTotal(): number {
    return this.data.length;
  }

  private groupByLanguages(): void {
    this.languagesWithCounts = this.data.reduce( (accumulator, current) => {
      if (accumulator[current.language_id]){
        accumulator[current.language_id].count++;
      } else {
        accumulator[current.language_id] = current.language;
        accumulator[current.language_id].count = 1;
      }
      return accumulator;
    }, [] )
    .filter(x => x !== null );
  }

  getMostCommonLanguage(): string{
    const language: INamedIdentifierWithCount = this.languagesWithCounts.reduce( (highest, current: INamedIdentifierWithCount) => {
      if(current.count > highest.count) highest = current;
      return highest;
    }, { id: 0, name: '', count: 0 });

    return language.name;
  }

  getLanguageCount(): number{
    return this.languagesWithCounts.length;
  }

  getLanguages(){
    return this.languagesWithCounts
      .map( (x: INamedIdentifierWithCount) => x.name )
      .sort();
  }

  getRecurringPercentage(): string{
    if (this.data.length === 0) return '0%';
    const recurring = this.data
    .filter( (x: ICourseData) => x.recurring === true)
    .length;
    console.log(recurring, this.data.length );
    return (100 * recurring / this.data.length).toFixed(1) + '%';
  }

  getLongestRunningCourse(): ILongestCourse{
    if( this.data.length === 0 ) return {data: [], duration: ''};
    const course = this.data
    .filter( (x: ICourseData) => x.recurring === true)
    .sort((a, b) => a.created > b.created ? 1 : (a.created === b.created ? 0 : -1))
    //.slice(0,1) ?to clone data
    .pop();

    const MILLISECONDS_PER_YEAR = 1000 * 60 * 60 * 24 * 365;
    const duration = (this.now.getTime() - new Date(course.created).getTime()) / MILLISECONDS_PER_YEAR;
    const longestCourse: ILongestCourse = {data: [course.name, course.institution.name], duration: `${duration.toFixed(1)} years`};
    return longestCourse;
  }
//TODO: use Map as output?
  getCoursesByYearAndMonth(years: number[]): Map<number, number[]>{
    if( this.data.length === 0 ) return new Map();
    //let output = Array(years.length).fill( Array(12).fill(0) );
    let output = new Map();
    years.forEach( year => {
      output.set(year, Array(12).fill(0) );
    });
    console.log("initial output map", output);

    this.data
      .filter( (x: ICourseData) => x.created !== null )
      .forEach( current => {
        const date = new Date(current.created)
        const month = date.getMonth();
        const year = date.getFullYear();
        let yearData = output.get(year);
        let monthData = yearData[month];
        monthData = monthData + 1;
        yearData[month] = monthData;
        output.set(year, yearData);
      })

      return output;
  }
}
