import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Colors } from '../../constants/Colors';
import { IDataListEntry } from '../../models/IDataListEntry';
import { IFilterElement } from '../../models/IFilterElement';
import { CoursesViewDataService } from '../../services/courses-view-data.service';

@Component({
  selector: 'app-courses-view',
  templateUrl: './courses-view.component.html',
  styleUrls: ['./courses-view.component.css']
})
export class CoursesViewComponent implements OnInit {
  //TODO fill automatically, or maybe get from Map?
  years: number[] = [2014, 2015, 2016, 2017, 2018, 2019, 2020];
  private coursesLimit: number = 20;
  public color: string = Colors.TERTIARY;
  public colorClass: string = 'tertiary';
  public filterElement: IFilterElement;

  constructor(private route: ActivatedRoute, public coursesViewDataService: CoursesViewDataService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const value = +params.get('value');
      const name = params.get('name') || '';
      this.filterElement = {name: name, value: value} as IFilterElement;
      console.log("name, value", name, value);
      this.coursesViewDataService.filter(value);
    })
  }

  get coursesByYearAndMonth(): Map<number, number[]> {
    return this.coursesViewDataService.getCoursesByYearAndMonth(this.years);
  }

  get courseTitles(): IDataListEntry[]{
    return this.coursesViewDataService.getCourseTitles(this.coursesLimit);
  }

  get total(): number{
    return this.coursesViewDataService.getTotal();
  }

  get mostCommonLanguage(): string{
    return this.coursesViewDataService.getMostCommonLanguage();
  }

  get languageCount(): number{
    return this.coursesViewDataService.getLanguageCount();
  }

  get languages(): IFilterElement[]{
    return this.coursesViewDataService.getLanguages();
  }

  get onlineCourses(): number|string {
    return this.coursesViewDataService.getOnlineCourses();
  }

  get recurringPercentage(): string{
    return this.coursesViewDataService.getRecurringPercentage();
  }

}
