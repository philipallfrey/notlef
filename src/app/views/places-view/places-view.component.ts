import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Colors } from '../../constants/Colors';
import { Endpoints } from '../../constants/Endpoints';
import { ICityInstitutionCount } from '../../models/ICityInstitutionCount';
import { IDataListEntry } from '../../models/IDataListEntry';
import { IFactList } from '../../models/IFactList';
import { IFilterElement } from '../../models/IFilterElement';
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
  public filterElement: IFilterElement;

  constructor(private route: ActivatedRoute, public placesViewDataService: PlacesViewDataService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const value = +params.get('value');
      const name = params.get('name') || '';
      this.filterElement = {name: name, value: value} as IFilterElement;
      this.placesViewDataService.filter(value, 'country_id');
      console.log(`name ${name} value ${value}`);
    })
  }

  get citiesCount(): number {
    return this.placesViewDataService.getCitiesCount();
  }

  get citiesEndpoint(): string {
    return Endpoints.CITIES;
  }

  get cityWithMostCourses(): IFactList {
    return this.placesViewDataService.getCityWithMostCourses();
  }

  get cityWithMostCoursesEndpoint(): string {
    return Endpoints.CITIES;
  }

  get mostInstitutionsPerCity() : IFactList {
    return this.placesViewDataService.getMostInstitutionsPerCity();
  }

  get countries(): IFilterElement[] {
    return this.placesViewDataService.getCountries();
  }

  get countriesEndpoint(): string {
    return Endpoints.COUNTRIES;
  }

  get countriesByRegion(): Map<string, number>[] {
    return this.placesViewDataService.getCountriesByRegion();
  }

  get countriesCount(): number {
    return this.placesViewDataService.getCountriesCount();
  }

  get institutions(): IDataListEntry[] {
    return this.placesViewDataService.getInstitutions(this.institutionsLimit);
  }

  get institutionsEndpoint(): string {
    return Endpoints.INSTITUTIONS;
  }

  get institutionsCount(): number {
    return this.placesViewDataService.getInstitutionsCount();
  }

  get institutionsPerCity(): ICityInstitutionCount[] {
    return this.placesViewDataService.getInstitutionsPerCity()
  }

  get institutionWithMostCourses(): string {
    return this.placesViewDataService.getInstitutionWithMostCourses();
  }


}
