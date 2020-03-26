import { Component, Input } from '@angular/core';

@Component({
  selector: 'page-heading',
  templateUrl: './page-heading.component.html',
  styleUrls: ['./page-heading.component.css']
})
export class PageHeadingComponent {
  @Input() backward: string;
  @Input() color: string; //TODO Use constants?
  @Input() filter: string;
  @Input() forward: string;
  @Input() heading: string;
  @Input() subHeading: string;

  constructor() { }

}
