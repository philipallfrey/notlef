import { Injectable } from '@angular/core';
import { Endpoints } from '../constants/Endpoints';
import { ICourseData } from '../models/ICourseData';
import { IDataListEntry } from '../models/IDataListEntry';
import { IFilterElement } from '../models/IFilterElement';
import { INamedIdentifierWithCount } from '../models/INamedIdentifierWithCount';
import { ApiService } from '../services/api.service';
import { DigitToWordService } from '../services/digit-to-word.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesViewDataService {
  public hasData = false;
  coursesData: ICourseData[] = [];
  filterValue: number;
  filteredCoursesData: ICourseData[] = [];
  filteredLanguagesData: INamedIdentifierWithCount[] = [];
  languagesData: INamedIdentifierWithCount[] = [];

  constructor(private apiService: ApiService, private digitToWordService: DigitToWordService) {
    this.apiService.getData(Endpoints.COURSES).subscribe( data => {
      this.coursesData = this.manuallyInsertOnlineData(data) as ICourseData[];
      if(this.filterValue){
        this.filter(this.filterValue); //handle case where view is filtered before it finished loading data
      } else {
        this.filteredCoursesData = this.coursesData;
      }
      this.hasData = true;
    });

    this.apiService.getData(Endpoints.LANGUAGES).subscribe( data => {
      this.languagesData = data.filter(x => x.course_count > 0) as INamedIdentifierWithCount[];
      if(this.filterValue){
        this.filter(this.filterValue); //handle case where view is filtered before it finished loading data
      } else {
        this.filteredLanguagesData = this.languagesData;
      }
      //this.hasData = true; //TODO Split by data type?
    });
  }

  filter(value: number){
    this.filterValue = value;
    if( 0 === value ){
      this.filteredCoursesData = this.coursesData;
      this.filteredLanguagesData = this.languagesData;
    } else {
      this.filteredCoursesData = this.coursesData.filter(x => x['language_id'] === value);
      this.filteredLanguagesData = this.languagesData.filter(x => x['id'] === value);
    }
  }

  //https://dhcr.clarin-dariah.eu/api/v1/courses/index?online=true correctly returns only courses with online=true
  //Unfortunatelyly https://dhcr.clarin-dariah.eu/api/v1/courses/index does not include the value of the "online" field
  private manuallyInsertOnlineData(data: any[]) {
    const onlineCourseIds = [167, 170, 173, 174, 175, 176, 177, 178, 179, 598];
    return data.map(current => {
      if(onlineCourseIds.includes(current.id)) current.online = true;
      return current;
    });
  }

  getCourseTitles( limit: number ): IDataListEntry[] {
    if(this.filteredCoursesData.length === 0) return [];

    let titles: IDataListEntry[] = this.filteredCoursesData
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

  getLanguageCount(): number{
    return this.languagesData.length;
  }

  getLanguages(): IFilterElement[]{
    if(this.languagesData.length === 0) return [];

    return this.languagesData
      .map(current => {return {name: current.name, value: current.id} as IFilterElement} )
      .sort( (a,b) => a.name > b.name ? 1 : -1 );
  }

  getMostCommonLanguage(): string{
    if( this.filteredLanguagesData.length === 0 ) return '';

    return this.filteredLanguagesData[0].name;
  }

  getOnlineCourses(): number | string {
    let count = 0;
    if( this.filteredCoursesData.length !== 0 ){
      count = this.filteredCoursesData
        .filter(x => x.online === true)
        .length;
    }
    return this.digitToWordService.convert(count);
  }

  getRecurringPercentage(): string{
    if (this.filteredCoursesData.length === 0) return '0%';
    const recurring = this.filteredCoursesData
      .filter( (x: ICourseData) => x.recurring === true)
      .length;
    return (100 * recurring / this.filteredCoursesData.length).toFixed(1) + '%';
  }

  getTotal(): number {
    return this.filteredCoursesData.length;
  }

  getYear(date: string): number {
    return +date.slice(0,4);
  }

  getCoursesByYearAndMonth(years: number[]): Map<number, number[]> {
    if( this.filteredCoursesData.length === 0 ) return new Map();

    let output = new Map();
    years.forEach( year => {
      output.set(year, Array(12).fill(0) );
    });

    this.filteredCoursesData
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
