import { Component } from '@angular/core';
import { BookManagementService } from '../app/api/services/book-management.service';
import { HttpClient } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input'; 
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ModelsBook, ModelsAuthor, ModelsGenre } from '../app/api/models';
import { AuthorService } from '../app/api/services/author.service';
import { GenreService } from '../app/api/services/genre.service';

@Component({
  selector: 'app-books',
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatFormFieldModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {
  image: File | null = null;
  imageUrl: string | null = null;
  showForm = false;
  books: ModelsBook[] = [];
  authors: ModelsAuthor[] = [];
  genres: ModelsGenre[] = [];

  bookName = new FormControl('', [Validators.required]);
  authorId = new FormControl<number | null>(null, [Validators.required]);
  genreId = new FormControl<number[]>([], [Validators.required]);
  price = new FormControl(0, [Validators.required]);
  published = new FormControl<Date | null>(null, [Validators.required]);
  summary = new FormControl('', [Validators.required]);
  isBn = new FormControl('', [Validators.required]);

  constructor(private bookManagementService: BookManagementService, private authorService: AuthorService, private genreService: GenreService, private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.loadAuthors();
    this.loadGenres();
  }

  // Načtení autorů
  loadAuthors() {
    this.authorService.getAllAuthors().subscribe({
      next: (v) => {
        // Přiřazení uživatelů do proměnné
        this.authors = v;
      },
      error: (e) => {
        console.error(e);
        alert(JSON.stringify(e));
      },
      complete: () => { }
    });
  }

  // Načtení žánrů
  loadGenres() {
    this.genreService.getAllGenres().subscribe({
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

  // Při výběru souboru tlačítkem
  onFileSelected(event: any): void {
    var file: File = event.target.files[0];
    // Pokud je soubor nahraný
    if (file) {
      // Kontrola formátu
      if (file.type != 'image/jpeg') {
        // this.dialogService.openSnackBar('Obrázek musí mít JPG formát!');
        return;
      }
      // Přidání k přílohám
      this.image = file;
      this.imageUrl = URL.createObjectURL(file);
      // this.dialogService.openSnackBar('Obrázek ' + file.name + ' vybrán.');
    }
  }

  // Odstranění vybraného obrázku
  removeImage(): void {
    this.image = null;
    this.imageUrl = null;
  }

  // Vytvoření knihy
  createBook(): void {
    this.bookManagementService.createBook({body: {
      // TODO změnit
      authorId: this.authorId.value!,
      genreIds: this.genreId.value!,
      isbn: this.isBn.value!,
      name: this.bookName.value!,
      price: this.price.value!,
      published: this.published.value!.toISOString(),
      summary: this.summary.value!
    }}).subscribe({
      next: (v) => {
        // TODO odstranit alert
        alert("Kniha vytvořena");
        // Pokud je nahrán obrázek
        if (this.image != null) {
          this.uploadImage(v.id);
        }
      },
      error: (e) => {
        alert(JSON.stringify(e));
      },
      complete: () => { }
    });
  }

  // Upload obrázku
  uploadImage(bookId: number): void {
    var formData = new FormData();
    formData.append('bookId', bookId.toString());
    formData.append('image', this.image!);
    this.httpClient.post(this.bookManagementService.rootUrl + '/api/book/management/bookImage', formData).subscribe({
      next: (_) => {
        // TODO odstranit alert
        alert("Obrázek nahrán");
      },
      error: (e) => {
        alert(JSON.stringify(e));
      },
      complete: () => { }
    });
  }
}
