import { Component } from '@angular/core';
import { BookManagementService } from '../app/api/services/book-management.service';
import { HttpClient } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ModelsBook, ModelsAuthor, ModelsGenre } from '../app/api/models';
import { AuthorService } from '../app/api/services/author.service';
import { GenreService } from '../app/api/services/genre.service';
import { BookService } from '../app/api/services/book.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-books',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatFormFieldModule],
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
  editingBookId: number | null = null;

  bookName = new FormControl<string>('', [Validators.required]);
  authorId = new FormControl<number | null>(null, [Validators.required]);
  genreId = new FormControl<number[]>([], [Validators.required]);
  price = new FormControl<number>(0, [Validators.required]);
  published = new FormControl<Date | null>(null, [Validators.required]);
  summary = new FormControl<string>('', [Validators.required]);
  isbn = new FormControl<string>('', [Validators.required]);

  constructor(private bookManagementService: BookManagementService, private authorService: AuthorService, private genreService: GenreService, private httpClient: HttpClient, public bookService: BookService) { }

  ngOnInit(): void {
    this.loadAuthors();
    this.loadGenres();
    this.loadBooks();
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

  // Načtení knih
  loadBooks() {
    this.bookService.getAllBooks().subscribe({
      next: (v) => {
        this.books = v;
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
    this.bookManagementService.createBook({
      body: {
        authorId: this.authorId.value!,
        genreIds: this.genreId.value!,
        isbn: this.isbn.value!,
        name: this.bookName.value!,
        price: this.price.value!,
        published: this.published.value!.toISOString(),
        summary: this.summary.value!
      }
    }).subscribe({
      next: (v) => {
        // Reset formuláře
        this.bookName.reset();
        this.authorId.reset();
        this.genreId.reset();
        this.price.reset();
        this.published.reset();
        this.summary.reset();
        this.isbn.reset();
        // Pokud je nahrán obrázek
        if (this.image != null) {
          this.uploadImage(v.id);
        } else {
          this.loadBooks();
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
        // Reset obrázku
        this.image = null;
        this.imageUrl = null;
        this.loadBooks();
      },
      error: (e) => {
        alert(JSON.stringify(e));
      },
      complete: () => { }
    });
  }

  updateBook(): void {
    this.bookManagementService.updateBook({
      body: {
        id: this.editingBookId!,
        authorId: this.authorId.value!,
        genreIds: this.genreId.value!,
        isbn: this.isbn.value!,
        name: this.bookName.value!,
        price: this.price.value!,
        published: this.published.value!.toISOString(),
        summary: this.summary.value!
      }
    }).subscribe({
      next: (v) => {
        alert("Kniha aktualizována");
        this.loadBooks();
      },
      error: (e) => {
        alert(JSON.stringify(e));
      },
      complete: () => {
        this.resetForm();
      }
    });
  }

  // Rozhoduje, zda se má kniha vytvořit nebo aktualizovat.
  saveBook(): void {
    if (this.editingBookId) {
      // Aktualizace stávající knihy
      this.updateBook();
    } else {
      // Vytvoření nové knihy
      this.createBook();
    }
  }

  resetForm(): void {
    this.bookName.reset();
    this.authorId.reset();
    this.genreId.reset();
    this.price.reset();
    this.published.reset();
    this.summary.reset();
    this.isbn.reset();
    this.showForm = false;
    this.editingBookId = null;
    this.imageUrl = null; // Vymažte náhled obrázku
    this.loadBooks();
  }

  editBook(book: ModelsBook): void {
    this.showForm = true;
    this.editingBookId = book.id;

    this.bookName.setValue(book.name);
    this.authorId.setValue(book.author.id);
    // Převeď pole žánrů na pole ID žánrů
    this.genreId.setValue(book.genres.map(genre => genre.id)); // Získáme pole ID žánrů
    this.price.setValue(book.price);
    this.published.setValue(new Date(book.published));
    this.summary.setValue(book.summary);
    this.isbn.setValue(book.isbn);

    // Vždy nastav URL obrázku s timestampem
    this.imageUrl = this.bookService.rootUrl + '/api/book/image/' + book.id + '?timestamp=' + Date.now();
  }
}
