import { Component, Input, OnInit } from '@angular/core';
import { KeyValuePipe } from '@angular/common';
import { IDataListEntry } from '../../models/IDataListEntry';

@Component({
  selector: 'data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent implements OnInit {
  @Input() apiData: string;
  @Input() csvData: any[]; //TODO: Is this too loose?
  @Input() heading: string;
  @Input() entries: IDataListEntry;
  //TODO: Allow entries to filter all the data on the page

  constructor() { }

  ngOnInit(): void {
  }

}
