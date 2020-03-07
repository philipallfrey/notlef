import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent implements OnInit {
  @Input() heading: string;
  @Input() entries: Record<string, number>;

  constructor() { }

  ngOnInit(): void {
  }

}
