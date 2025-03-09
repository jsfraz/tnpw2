import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatSliderModule} from '@angular/material/slider';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field'; 

@Component({
  selector: 'app-books',
  imports: [RouterLink, MatSliderModule, MatFormFieldModule, MatInputModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {
  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }
}
