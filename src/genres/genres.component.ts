import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input'; 
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { ModelsGenre } from '../app/api/models';
import { ModelsAuthor } from '../app/api/models';
import { AuthorManagementService } from '../app/api/services/author-management.service';
import { GenreManagementService } from '../app/api/services/genre-management.service';
import { AuthorService } from '../app/api/services/author.service';
import { GenreService } from '../app/api/services/genre.service';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-genres',
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatFormFieldModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.css',
})
export class GenresComponent {
  genres: ModelsGenre[] = [];
  showGenreForm = false;

  //input pro žánr
  genreName = new FormControl('', [Validators.required]);

  constructor(private genreManagementService: GenreManagementService, private genreService: GenreService) { }

  ngOnInit(): void {
    this.loadGenres();
  }

  resetForm() {
    this.genreName.reset();
  }

  // Načtení
  loadGenres() {
    this.genreService.getAllGenres({ }).subscribe({
      next: (v) => {
        this.genres = v;
      },
      error: (e) => {
        console.error(e);
        alert(JSON.stringify(e));
      },
      complete: () => { }
    });
  }

  createGenre() {
    if (this.genreName.valid) {
      this.genreManagementService.createGenre({ 
      body: {
        name: this.genreName.value!
    } 
  }).subscribe({
      next: (v) => {
        this.loadGenres();
        this.showGenreForm = false;
        this.resetForm();
      },
      error: (e) => {
        console.error(e);
        alert(JSON.stringify(e));
      },
      complete: () => { }
    });
  } else {
    this.genreName.markAsTouched();
  }
 } 
    
}