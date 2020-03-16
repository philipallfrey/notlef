import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'factoid',
  templateUrl: './factoid.component.html',
  styleUrls: ['./factoid.component.css']
})
export class FactoidComponent implements OnInit {
  @Input() heading: string;
  @Input() fact: string;
  @Input() list: string[];

  constructor() { }

  ngOnInit(): void {
  }

}
