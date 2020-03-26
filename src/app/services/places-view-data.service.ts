import { Injectable } from '@angular/core';
import { Endpoints } from '../constants/Endpoints';
import { IDataListEntry } from '../models/IDataListEntry';
import { IFactList } from '../models/IFactList';
import { IFilterElement } from '../models/IFilterElement';
import { INamedIdentifierWithCount } from '../models/INamedIdentifierWithCount';
import { IPlaceData } from '../models/IPlaceData';
import { ApiService } from '../services/api.service';
import { CountryToRegionService } from '../services/country-to-region.service';
import { DigitToWordService } from '../services/digit-to-word.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesViewDataService {
  public hasData = false;
  citiesData: IPlaceData[] = [];
  countriesData: INamedIdentifierWithCount[] = [];
  institutionsData: IPlaceData[] = [];
  filteredCitiesData: IPlaceData[] = [];
  filteredCountriesData: INamedIdentifierWithCount[] = [];
  filteredInstitutionsData: IPlaceData[] = [];
  institutionsPerCity: Map<string, number>;

  //TODO: Factor out some of the similarities between this and CoursesViewDataService
  constructor(private apiService: ApiService, private countryToRegionService: CountryToRegionService, private digitToWordService: DigitToWordService) {
    //TODO: Convert to a loop/function
    this.apiService.getData(Endpoints.CITIES).subscribe( data => {
      this.hasData = true; //TODO Split by data type?
      this.citiesData = data.filter(x => x.course_count > 0) as IPlaceData[];
      this.filteredCitiesData = this.citiesData;
    });

    this.apiService.getData(Endpoints.COUNTRIES).subscribe( data => {
      this.hasData = true; //TODO Split by data type?
      this.countriesData = data.filter(x => x.course_count > 0) as INamedIdentifierWithCount[];
      this.filteredCountriesData = this.countriesData;
    });

    this.apiService.getData(Endpoints.INSTITUTIONS).subscribe( data => {
      this.hasData = true; //TODO Split by data type?
      this.institutionsData = data.filter(x => x.course_count > 0) as IPlaceData[];
      this.filteredInstitutionsData = this.institutionsData;
    });

  }

  filter(value: number, field: string){
    if( 0 === value ){
      this.filteredCitiesData = this.citiesData
      this.filteredCountriesData = this.countriesData
      this.filteredInstitutionsData = this.institutionsData;
    } else {
      this.filteredCitiesData = this.citiesData.filter(x => x[field] === value);
      this.filteredCountriesData = this.countriesData.filter(x => x['id'] === value); //TODO find a nicer way to handle this case
      this.filteredInstitutionsData = this.institutionsData.filter(x => x[field] === value);
    }
  }

  getCities(): string[] {
    if(this.filteredCitiesData.length === 0) return [];
    return this.filteredCitiesData
      .map(current => current.name);

  }

  getCitiesCount(): number {
    return this.filteredCitiesData.length;
  }

  getCityWithMostCourses(): IFactList {
    if(this.filteredCitiesData.length === 0) return {fact:'', list:[]} as IFactList;

    return {fact: this.filteredCitiesData[0].name, list:[`${this.filteredCitiesData[0].course_count} courses`] } as IFactList;
  }

  getCountries(): IFilterElement[] {
    if(this.countriesData.length === 0) return [];

    return this.countriesData
      .map(current => {return {name: current.name, value: current.id} as IFilterElement} )
      .sort( (a,b) => a.name > b.name ? 1 : -1 );
  }

  getCountriesByRegion(): Map<string, number>[] {
    if(this.countriesData.length === 0) return [new Map()];

    let regions: Map<string, number> = new Map();
    this.countriesData.forEach( (current: INamedIdentifierWithCount) => {
      const currentRegion = this.countryToRegionService.convert(current.name).toUpperCase();
      if(regions.get(currentRegion)){
        regions.set(currentRegion, regions.get(currentRegion) + current.course_count);
      } else {
        regions.set(currentRegion, current.course_count);
      }
    });

    const sortedRegions = new Map([...regions.entries()].sort());
    const size = sortedRegions.size;
    if (size === 5) return [sortedRegions];

    //Split into groups of three or four for better display
    let limit = 4;
    if (size === 6 || size === 9){
      limit = 3;
    }

    let index = 1;
    const groupedRegions = [];
    let row = new Map();
    for (let [key, value] of sortedRegions) {
      //Accumulate values
      row.set(key,value);

      //Start a new row
      if (index % limit === 0 || index === size) {
        groupedRegions.push(row);
        row = new Map();
      }

      //Increase running count
      index++;
    }

    return groupedRegions;
  }

  getCountriesCount(): number {
    return this.countriesData.length;
  }

  getInstitutions(limit: number) : IDataListEntry[] {
    if(this.filteredInstitutionsData.length === 0) return [];

    return this.filteredInstitutionsData
    .slice(0,limit) //Institutions are already sorted by course count
    .map( current => {
      return {meta: current.course_count, text: current.name} as IDataListEntry;
    });
  }

  getInstitutionsCount(): number {
    return this.filteredInstitutionsData.length;
  }

  getInstitutionWithMostCourses(): string {
    if(this.filteredInstitutionsData.length === 0) return '';
    return this.filteredInstitutionsData[0].name; //Currently there are two institutions with the most courses, for simplicity take the first
  }

  getMostInstitutionsPerCity(): IFactList {
    if (this.filteredInstitutionsData.length === 0) return {fact:'', list:[]} as IFactList;

    let cities = new Map();
    this.filteredInstitutionsData.forEach(current => {
      if(cities.get(current.city.name)){
        cities.set(current.city.name, cities.get(current.city.name) + 1);
      } else {
        cities.set(current.city.name, 1);
      }
    });

    const topCity = [...cities.entries()]
      .sort((a,b) => a[1] - b[1])
      .pop();

    return { fact: this.digitToWordService.convert(topCity[1]), list: [topCity[0]]} as IFactList;
  }

}
