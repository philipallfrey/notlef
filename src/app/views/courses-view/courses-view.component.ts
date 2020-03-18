import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CoursesViewDataService } from '../../services/courses-view-data.service';

@Component({
  selector: 'app-courses-view',
  templateUrl: './courses-view.component.html',
  styleUrls: ['./courses-view.component.css']
})
export class CoursesViewComponent implements OnInit {
  //TODO fill automatically
  years: number[] = [2014, 2015, 2016, 2017, 2018, 2019, 2020];

  constructor(public coursesViewDataService: CoursesViewDataService) { }

  ngOnInit(): void {
  }

  getCourseTitles( limit: number ){
    return this.coursesViewDataService.getCourseTitles(limit);
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

  get recurringPercentage(){
    return this.coursesViewDataService.getRecurringPercentage();
  }

  get longestRunning(){
    return this.coursesViewDataService.getLongestRunningCourse();
  }

}
