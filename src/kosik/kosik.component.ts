import { Component } from '@angular/core';
import {MatSliderModule} from '@angular/material/slider';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-books',
  imports: [MatSliderModule, MatFormFieldModule, MatInputModule],
  templateUrl: './kosik.component.html',
  styleUrl: './kosik.component.css'
})
export class KosikComponent {
    booksCount: number = 0; // Inicializace počtu knih

    increment() {
        if (this.booksCount < 999) {
            this.booksCount++;
        }
    }

    decrement() {
        if (this.booksCount > 0) {
            this.booksCount--;
        }
    }
}
