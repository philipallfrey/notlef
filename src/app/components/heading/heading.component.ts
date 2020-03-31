import { Component, Input } from '@angular/core';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.css']
})
export class HeadingComponent{
  @Input() text: string;
  @Input() csvData: any[] = [];
  @Input() apiData: string = '';

  showApiDataModal: boolean = false;

  constructor(public apiService: ApiService) { }

  onDownload(): void {
    new ngxCsv(this.csvData, `${this.text}`, {showLabels: true, headers: Object.keys(this.csvData[0])});
  }

  onPresentEndpoint(): void {
    this.showApiDataModal = true;
  }

  closeApiDataModal(): void {
    this.showApiDataModal = false;
  }
}
