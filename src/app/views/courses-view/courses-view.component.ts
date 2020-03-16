import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CoursesViewDataService } from '../../services/courses-view-data.service';

@Component({
  selector: 'app-courses-view',
  templateUrl: './courses-view.component.html',
  styleUrls: ['./courses-view.component.css']
})
export class CoursesViewComponent implements OnInit {

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

}
