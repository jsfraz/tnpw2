import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatSliderModule} from '@angular/material/slider';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-books',
  imports: [
    MatCheckboxModule,
    RouterLink, 
    MatSliderModule, 
    MatFormFieldModule, 
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {
  startvalue = 100;
  endvalue = 1000;
  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }
}
