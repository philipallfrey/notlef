import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CoursesViewDataService } from '../../services/courses-view-data.service';

@Component({
  selector: 'app-courses-view',
  templateUrl: './courses-view.component.html',
  styleUrls: ['./courses-view.component.css']
})
export class CoursesViewComponent implements OnInit {
  //TODO fill automatically, or maybe get from Map?
  years: number[] = [2014, 2015, 2016, 2017, 2018, 2019, 2020];
  coursesLimit: number = 20;

  constructor(public coursesViewDataService: CoursesViewDataService) { }

  ngOnInit(): void {
  }

  get courseTitles(){
    return this.coursesViewDataService.getCourseTitles(this.coursesLimit);
  }

  get total(){
    return this.coursesViewDataService.getTotal();
  }

  get mostCommonLanguage(){
    return this.coursesViewDataService.getMostCommonLanguage();
  }

  get languageCount(){
    return this.coursesViewDataService.getLanguageCount();
  }

  get languages(){
    return this.coursesViewDataService.getLanguages();
  }

  get onlineCourses(){
    return this.coursesViewDataService.getOnlineCourses();
  }

  get recurringPercentage(){
    return this.coursesViewDataService.getRecurringPercentage();
  }

}
