import { Component, Input } from '@angular/core';

@Component({
  selector: 'heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.css']
})
export class HeadingComponent{
  @Input() text: string;

  constructor() { }

}
