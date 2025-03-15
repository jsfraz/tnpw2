import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input'; 
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
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
  selector: 'app-authors',
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatFormFieldModule],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorsComponent {
  authors: ModelsAuthor[] = [];
  showAuthorForm = false;

  //input pro autora
  birth = new FormControl('', [Validators.required]);
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  
  constructor(private authorManagementSerice: AuthorManagementService, private genreManagementService: GenreManagementService, private authorService: AuthorService, private genreService: GenreService) { }

  // TODO: Opravit nacitani autoru

  resetForm() {
    this.firstName.reset();
    this.lastName.reset();
    this.lastName.reset();
  }

  ngOnInit(): void {
    this.loadAuthors();
  }

  loadData() {
    this.loadAuthors();
  }

  // Načtení uživatelů
  loadAuthors() {
    this.authorService.getAllAuthors({  }).subscribe({
      next: (v) => {
        // Přiřazení uživatelů do proměnné
        this.authors = v;
      },
      error: (e) => {
        console.error(e);
        alert(e.error.error);
      },
      complete: () => { }
    });
  }

  // Načtení uživatelů
  createAuthor() {
    this.authorManagementSerice.createAuthor({ body: {
      birth: this.birth.value!,
      firstName: this.firstName.value!,
      lastName: this.lastName.value!
    } }).subscribe({
      next: (v) => {
        // Přiřazení uživatelů do proměnné
      },
      error: (e) => {
        console.error(e);
        alert(e.error.error);
      },
      complete: () => { }
    });
  }
}
