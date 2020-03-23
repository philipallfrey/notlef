import { Component, OnInit } from '@angular/core';
import { Colors } from '../../constants/Colors';
import { IDataListEntry } from '../../models/IDataListEntry';
import { IFactList } from '../../models/IFactList';
import { PlacesViewDataService } from '../../services/places-view-data.service';

@Component({
  selector: 'app-places-view',
  templateUrl: './places-view.component.html',
  styleUrls: ['./places-view.component.css']
})
export class PlacesViewComponent implements OnInit {
  private institutionsLimit: number = 20;
  public color: string = Colors.PRIMARY;
  public colorClass: string = 'primary';

  constructor(public placesViewDataService: PlacesViewDataService) { }

  ngOnInit(): void {
  }

  get citiesCount(): number {
    return this.placesViewDataService.getCitiesCount();
  }

  get cityWithMostCourses(): IFactList {
    return this.placesViewDataService.getCityWithMostCourses();
  }

  get countries(): string[] {
    return this.placesViewDataService.getCountries();
  }

  get countriesByRegion(): Map<string, number>[] {
    return this.placesViewDataService.getCountriesByRegion();
  }

  get countriesCount(): number {
    return this.placesViewDataService.getCountriesCount();
  }

  get institutions(): IDataListEntry[] {
    return this.placesViewDataService.getInstitutions( this.institutionsLimit );
  }

  get institutionsCount(): number {
    return this.placesViewDataService.getInstitutionsCount();
  }

  get institutionWithMostCourses(): string {
    return this.placesViewDataService.getInstitutionWithMostCourses();
  }

  get mostInstitutionsPerCity() : IFactList {
    return this.placesViewDataService.getMostInstitutionsPerCity();
  }

}
