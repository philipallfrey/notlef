import { ICity } from './ICity';
import { INamedIdentifier } from './INamedIdentifier';

export interface IPlaceData {
  id: number,
  name: string,
  city_id?: number,
  city?: ICity,
  country_id: number,
  country: INamedIdentifier,
  course_count: number
}
