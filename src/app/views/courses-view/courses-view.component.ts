import { Component, OnInit } from '@angular/core';
import { DataListComponent } from '../../components/data-list/data-list.component';

@Component({
  selector: 'app-courses-view',
  templateUrl: './courses-view.component.html',
  styleUrls: ['./courses-view.component.css']
})
export class CoursesViewComponent implements OnInit {
  entries: Record<string, number> = {};

  constructor() { }

  ngOnInit(): void {
    this.entries['Entry 1'] = 2;
    this.entries['Entry 2'] = 1;
    console.log(this.entries);
  }

}
