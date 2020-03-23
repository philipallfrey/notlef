import { ICity } from './ICity';
import { ICourseType } from './ICourseType';
import { IInstitution } from './IInstitution';
import { INamedIdentifier } from './INamedIdentifier';
import { ITadirahObject } from './ITadirahObject';

export interface ICourseData {
  id: number,
  active:	boolean,
  deleted: boolean,
  deletion_reason_id: number,
  approved: boolean,
  created: string, //date string
  createdDate: number, //timestamp in milliseconds
  updated: string, //date string
  updatedDate: number, //timestamp in milliseconds
  name: string,
  description: string,
  country_id: number,
  city_id: number,
  institution_id: number,
  department: string,
  course_parent_type_id: number, //enum
  course_type_id: number, //enum
  online?: boolean,
  language_id: number, //enum
  access_requirements: string,
  start_date: string, //date
  duration: number //?
  course_duration_unit_id: number, //enum
  recurring: boolean,
  info_url: string,
  ects: number,
  contact_mail: string,
  contact_name: string,
  lon: number,
  lat: number
  tadirah_objects: ITadirahObject[],
  tadirah_techniques: ITadirahObject[],
  disciplines: INamedIdentifier[],
  course_duration_unit: INamedIdentifier,
  language: INamedIdentifier,
  course_type: ICourseType[],
  course_parent_type: INamedIdentifier,
  institution: IInstitution,
  city: ICity,
  country: INamedIdentifier,
  deletion_reason: string
}
