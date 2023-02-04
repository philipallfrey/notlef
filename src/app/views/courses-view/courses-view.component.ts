import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Colors } from '../../constants/Colors';
import { Endpoints } from '../../constants/Endpoints';
import { IDataListEntry } from '../../models/IDataListEntry';
import { IFilterElement } from '../../models/IFilterElement';
import { CoursesViewDataService } from '../../services/courses-view-data.service';

@Component({
  selector: 'app-courses-view',
  templateUrl: './courses-view.component.html',
  styleUrls: ['./courses-view.component.css']
})
export class CoursesViewComponent implements OnInit {
  private coursesLimit: number = 20;
  public color: string = Colors.TERTIARY;
  public colorClass: string = 'tertiary';
  public filterElement: IFilterElement;
  private initialYear: number = 2014;
  public years: number[];

  constructor(private route: ActivatedRoute, public coursesViewDataService: CoursesViewDataService) { }

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.years = Array.from(Array(currentYear - this.initialYear + 1), (element, index) => index + this.initialYear);
    this.route.paramMap.subscribe(params => {
      const value = +params.get('value');
      const name = params.get('name') || '';
      this.filterElement = {name: name, value: value} as IFilterElement;
      this.coursesViewDataService.filter(value);
    })
  }

  get coursesByYearAndMonth(): Map<number, number[]> {
    return this.coursesViewDataService.getCoursesByYearAndMonth(this.years);
  }

  get courseTitles(): IDataListEntry[] {
    return this.coursesViewDataService.getCourseTitles(this.coursesLimit);
  }

  get courseTitlesData(): string {
    return `${Endpoints.COURSES}?sort=updated:DESC`;
  }

  get total(): number {
    return this.coursesViewDataService.getTotal();
  }

  get totalData(): string {
    return Endpoints.COURSES_COUNT;
  }

  get mostCommonLanguage(): string{
    return this.coursesViewDataService.getMostCommonLanguage();
  }

  get mostCommonLanguageData(): string {
    return Endpoints.LANGUAGES;
  }

  get languageCount(): number {
    return this.coursesViewDataService.getLanguageCount();
  }

  get languageCountData(): string {
    return Endpoints.LANGUAGES;
  }

  get languages(): IFilterElement[] {
    return this.coursesViewDataService.getLanguages();
  }

  get languagesData(): string {
    return Endpoints.LANGUAGES;
  }

  get onlineCourses(): number|string {
    return this.coursesViewDataService.getOnlineCourses();
  }

  get onlineCoursesData(): string {
    return `${Endpoints.COURSES}?online=true`
  }

  get recurringPercentage(): string {
    return this.coursesViewDataService.getRecurringPercentage();
  }

  get recurringPercentageData(): string {
    return `${Endpoints.COURSES}?recurring=true`
  }

}
