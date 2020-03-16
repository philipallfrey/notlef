import { Injectable } from '@angular/core';
import { ICourseData } from '../models/ICourseData';
import { IDataListEntry} from '../models/IDataListEntry';
import { INamedIdentifierWithCount } from '../models/INamedIdentifierWithCount';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesViewDataService {
  readonly ENDPOINT = '/courses/index';
  data: ICourseData[] = [];
  languagesWithCounts: INamedIdentifierWithCount[] = [];

  constructor(private apiService: ApiService) {
    this.apiService.getData(this.ENDPOINT).subscribe( data => {
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
}
