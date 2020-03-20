import { Injectable } from '@angular/core';
import { Colors } from '../constants/colors';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor() {
    document.documentElement.style.setProperty('--primary-color', Colors.PRIMARY);
    document.documentElement.style.setProperty('--secondary-color', Colors.SECONDARY);
    document.documentElement.style.setProperty('--tertiary-color', Colors.TERTIARY);
   }
}
