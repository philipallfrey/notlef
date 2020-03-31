import { Component, OnInit } from '@angular/core';
import { Colors } from '../../constants/Colors';

@Component({
  selector: 'app-colophon-view',
  templateUrl: './colophon-view.component.html',
  styleUrls: ['./colophon-view.component.css']
})
export class ColophonViewComponent implements OnInit {
  public color: string = Colors.SECONDARY;
  public colorClass: string = 'secondary';

  constructor() { }

  ngOnInit(): void {
  }

}
