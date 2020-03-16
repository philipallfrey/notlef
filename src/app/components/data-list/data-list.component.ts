import { Component, Input, OnInit } from '@angular/core';
import { KeyValuePipe } from '@angular/common';
import { IDataListEntry } from '../../models/IDataListEntry';

@Component({
  selector: 'data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent implements OnInit {
  @Input() heading: string;
  @Input() entries: IDataListEntry;

  constructor() { }

  ngOnInit(): void {
  }

}
