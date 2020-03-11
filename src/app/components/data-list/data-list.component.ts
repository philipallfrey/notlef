import { Component, Input, OnInit } from '@angular/core';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'data-list',
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
