import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IFilterElement } from '../../models/IFilterElement';

@Component({
  selector: 'factoid',
  templateUrl: './factoid.component.html',
  styleUrls: ['./factoid.component.css']
})
export class FactoidComponent {
  @Input() apiData: string;
  @Input() color: string;
  @Input() csvData: any[]; //TODO: Is this too loose?
  @Input() currentFilter: IFilterElement = {name:'', value:0};
  @Input() fact: string;
  @Input() heading: string;
  @Input() view: string;
  @Input() isFilter: boolean;
  @Input() list: string[] | IFilterElement[];


  constructor() { }

  getColor(entry): string {
    if('' === this.currentFilter.name){
      return this.color;
    } else {
      return (entry.value === this.currentFilter.value) ? this.color : 'inactive';
    }
  }

  getRouterLink(entry): string {
    return (entry.name === this.currentFilter.name) ? this.view : this.view + '/' + entry.name + '/' + entry.value;
  }

}
