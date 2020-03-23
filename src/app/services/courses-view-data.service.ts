import { Injectable } from '@angular/core';
import { Endpoints } from '../constants/Endpoints';
import { ICourseData } from '../models/ICourseData';
import { IDataListEntry } from '../models/IDataListEntry';
import { INamedIdentifierWithCount } from '../models/INamedIdentifierWithCount';
import { ApiService } from '../services/api.service';
import { DigitToWordService } from '../services/digit-to-word.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesViewDataService {
  readonly now: Date = new Date();
  public hasData = false;
  data: ICourseData[] = [];
  languagesWithCounts: INamedIdentifierWithCount[] = [];

  constructor(private apiService: ApiService, private digitToWordService: DigitToWordService) {
    this.apiService.getData(Endpoints.COURSES).subscribe( data => {
      console.log("received data");
      this.hasData = true;
      this.data = this.manuallyInsertOnlineData(data) as ICourseData[];
      this.groupByLanguages();
    });
  }

  //Unfortunately ICourseData.online is in the schema but not in the data returned by the API
  private manuallyInsertOnlineData(data: any[]) {
    const onlineCourseIds = [170, 175, 177, 178, 598];
    return data.map(current => {
      if(onlineCourseIds.includes(current.id)) current.online = true;
      return current;
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
        accumulator[current.language_id].course_count++;
      } else {
        accumulator[current.language_id] = current.language;
        accumulator[current.language_id].course_count = 1;
      }
      return accumulator;
    }, [] )
    .filter(x => x !== null );
  }

  getMostCommonLanguage(): string{
    const language: INamedIdentifierWithCount = this.languagesWithCounts.reduce( (highest, current: INamedIdentifierWithCount) => {
      if(current.course_count > highest.course_count) highest = current;
      return highest;
    }, { id: 0, name: '', course_count: 0 });

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
    return (100 * recurring / this.data.length).toFixed(1) + '%';
  }

  getOnlineCourses(): number | string {
    let count = 0;
    if( this.data.length !== 0 ){
      count = this.data
        .filter(x => x.online === true)
        .length;
      }
      return this.digitToWordService.convert(count);
  }

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
