import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountryToRegionService {
  //NB There are many ways to divide the world in regions,
  //I've chosen one with a small number of regions that also includes one for New Zealand

  readonly countryToRegion = {
    'Burundi': 'Africa',
    'Comoros': 'Africa',
    'Djibouti': 'Africa',
    'Eritrea': 'Africa',
    'Ethiopia': 'Africa',
    'Kenya': 'Africa',
    'Madagascar': 'Africa',
    'Malawi': 'Africa',
    'Mauritius': 'Africa',
    'Mayotte': 'Africa',
    'Mozambique': 'Africa',
    'Reunion': 'Africa',
    'Rwanda': 'Africa',
    'Seychelles': 'Africa',
    'Somalia': 'Africa',
    'Tanzania': 'Africa',
    'Uganda': 'Africa',
    'Zambia': 'Africa',
    'Zimbabwe': 'Africa',
    'Angola': 'Africa',
    'Cameroon': 'Africa',
    'Central African Republic': 'Africa',
    'Chad': 'Africa',
    'Congo': 'Africa',
    'Democratic Republic of the Congo': 'Africa',
    'Equatorial Guinea': 'Africa',
    'Gabon': 'Africa',
    'Sao Tome and Principe': 'Africa',
    'Algeria': 'Africa',
    'Egypt': 'Africa',
    'Libyan Arab Jamahiriya': 'Africa',
    'Morroco': 'Africa',
    'South Sudan': 'Africa',
    'Sudan': 'Africa',
    'Tunisia': 'Africa',
    'Western Sahara': 'Africa',
    'Botswana': 'Africa',
    'Eswatini': 'Africa',
    'Lesotho': 'Africa',
    'Namibia': 'Africa',
    'South Africa': 'Africa',
    'Benin': 'Africa',
    'Burkina Faso': 'Africa',
    'Cape Verde': 'Africa',
    "Cote d'Ivoire": 'Africa',
    'The Gambia': 'Africa',
    'Ghana': 'Africa',
    'Guinea': 'Africa',
    'Guinea-Bissau': 'Africa',
    'Liberia': 'Africa',
    'Mali': 'Africa',
    'Mauritania': 'Africa',
    'Niger': 'Africa',
    'Nigeria': 'Africa',
    'Saint Helena': 'Africa',
    'Senegal': 'Africa',
    'Sierra Leone': 'Africa',
    'Togo': 'Africa',
    'Anguilla': 'Caribbean',
    'Antigua and Barbuda': 'Caribbean',
    'Aruba': 'Caribbean',
    'Bahamas': 'Caribbean',
    'Barbados': 'Caribbean',
    'Bonaire, Saint Eustatius and Saba': 'Caribbean',
    'British Virgin Islands': 'Caribbean',
    'Cayman Islands': 'Caribbean',
    'Cuba': 'Caribbean',
    'Curaçao': 'Caribbean',
    'Dominica': 'Caribbean',
    'Dominican Republic': 'Caribbean',
    'Grenada': 'Caribbean',
    'Guadeloupe': 'Caribbean',
    'Haiti': 'Caribbean',
    'Jamaica': 'Caribbean',
    'Martinique': 'Caribbean',
    'Monserrat': 'Caribbean',
    'Puerto Rico': 'Caribbean',
    'Saint-Barthélemy': 'Caribbean',
    'St. Kitts and Nevis': 'Caribbean',
    'Saint Lucia': 'Caribbean',
    'Saint Martin': 'Caribbean',
    'Saint Vincent and the Grenadines': 'Caribbean',
    'Sint Maarten': 'Caribbean',
    'Trinidad and Tobago': 'Caribbean',
    'Turks and Caicos Islands': 'Caribbean',
    'Virgin Islands': 'Caribbean',
    'Bermuda': 'North America',
    'Canada': 'North America',
    'Greenland': 'North America',
    'Saint Pierre and Miquelon': 'North America',
    'United States of America': 'North America',
    'Argentina': 'South America',
    'Bolivia': 'South America',
    'Brazil': 'South America',
    'Brasil': 'South America', // observed in data
    'Chile': 'South America',
    'Colombia': 'South America',
    'Ecuador': 'South America',
    'Falkland Islands': 'South America',
    'French Guiana': 'South America',
    'Guyana': 'South America',
    'Paraguay': 'South America',
    'Peru': 'South America',
    'Suriname': 'South America',
    'Uruguay': 'South America',
    'Venezuela': 'South America',
    'Afganistan':'Asia',
    'Armenia':'Asia',
    'Azerbaijan':'Asia',
    'Bangladesh':'Asia',
    'Bhutan':'Asia',
    'Brunei Darussalam':'Asia',
    'Cambodia':'Asia',
    'China':'Asia',
    'Georgia':'Asia',
    'Hong Kong':'Asia',
    'India':'Asia',
    'Indonesia':'Asia',
    'Japan':'Asia',
    'Kazakhstan':'Asia',
    'North Korea':'Asia',
    'South Korea':'Asia',
    'Kyrgyzstan':'Asia',
    'Laos':'Asia',
    'Macao':'Asia',
    'Malaysia':'Asia',
    'Maldives':'Asia',
    'Mongolia':'Asia',
    'Myanmar':'Asia',
    'Nepal':'Asia',
    'Pakistan':'Asia',
    'Philippines':'Asia',
    'Singapore':'Asia',
    'Sri Lanka':'Asia',
    'Taiwan':'Asia',
    'Tajikistan':'Asia',
    'Thailand':'Asia',
    'Timor Leste':'Asia',
    'Turkmenistan':'Asia',
    'Uzbekistan':'Asia',
    'Vietnam':'Asia',
    'Albania': 'Europe',
    'Andorra': 'Europe',
    'Belarus': 'Europe',
    'Bosnia': 'Europe',
    'Croatia': 'Europe',
    'Faroe Islands': 'Europe',
    'Gibraltar': 'Europe',
    'Iceland': 'Europe',
    'Jersey': 'Europe',
    'Kosovo': 'Europe',
    'Liechtenstein': 'Europe',
    'Moldova': 'Europe',
    'Monaco': 'Europe',
    'Montenegro': 'Europe',
    'North Macedonia': 'Europe',
    'Norway': 'Europe',
    'Russian Federation': 'Europe',
    'San Marino': 'Europe',
    'Serbia': 'Europe',
    'Svalbard and Jan Mayen Islands': 'Europe',
    'Switzerland': 'Europe',
    'Turkey': 'Europe',
    'Ukraine': 'Europe',
    'Vatican': 'Europe',
    'Austria': 'Europe',
    'Belgium': 'Europe',
    'Bulgaria': 'Europe',
    'Cyprus': 'Europe',
    'Czech Republic': 'Europe',
    'Denmark': 'Europe',
    'Estonia': 'Europe',
    'Finland': 'Europe',
    'France': 'Europe',
    'Germany': 'Europe',
    'Greece': 'Europe',
    'Hungary': 'Europe',
    'Ireland': 'Europe',
    'Italy': 'Europe',
    'Latvia': 'Europe',
    'Luxembourg': 'Europe',
    'Lithuania': 'Europe',
    'Malta': 'Europe',
    'Netherlands': 'Europe',
    'Poland': 'Europe',
    'Portugal': 'Europe',
    'Romania': 'Europe',
    'Slovakia': 'Europe',
    'Slovenia': 'Europe',
    'Spain': 'Europe',
    'Sweden': 'Europe',
    'United Kingdom': 'Europe',
    'Bahrain': 'Middle East',
    'Iraq': 'Middle East',
    'Iran': 'Middle East',
    'Israel': 'Middle East',
    'Jordan': 'Middle East',
    'Kuwait': 'Middle East',
    'Lebanon': 'Middle East',
    'Oman': 'Middle East',
    'Palestine': 'Middle East',
    'Qatar': 'Middle East',
    'Saudi Arabia': 'Middle East',
    'Syria': 'Middle East',
    'United Arab Emirates': 'Middle East',
    'Yemen': 'Middle East',
    'Australia': 'Oceania',
    'Fiji': 'Oceania',
    'French Polynesia': 'Oceania',
    'Guam': 'Oceania',
    'Kiribati': 'Oceania',
    'Marshall Islands': 'Oceania',
    'Micronesia': 'Oceania',
    'New Caledonia': 'Oceania',
    'New Zealand': 'Oceania',
    'Papua New Guinea': 'Oceania',
    'Samoa': 'Oceania',
    'American Samoa': 'Oceania',
    'Solomon Islands': 'Oceania',
    'Tonga': 'Oceania',
    'Vanuatu': 'Oceania',
  }
  constructor() { }

  convert(country: string): string {
    if (this.countryToRegion[country]){
      return this.countryToRegion[country];
    } else {
      console.log('CountryToRegionService: Unknown country', country);
      return 'Other';
    }
  }
}
