import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'page-heading',
  templateUrl: './page-heading.component.html',
  styleUrls: ['./page-heading.component.css']
})
export class PageHeadingComponent implements OnInit {
  @Input() heading: string;
  @Input() subHeading: string;
  @Input() color: string; //Use constants?

  constructor() { }

  ngOnInit(): void {
  }

}
