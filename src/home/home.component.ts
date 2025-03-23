import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { BookService } from '../app/api/services/book.service';
import { GenreService } from '../app/api/services/genre.service';
import { AuthorService } from '../app/api/services/author.service';
import { ModelsAuthor, ModelsGenre, ModelsBook } from '../app/api/models';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-home',
  imports: [
    MatCheckboxModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // Cena
  minPrice: number = 100;
  maxPrice: number = 1000;
  priceStep: number = 10;
  minSelectedPrice: number = this.minPrice;
  maxSelectedPrice: number = this.maxPrice;
  // Autoři
  authorSearch: string = '';
  authors: ModelsAuthor[] = [];
  selectedAuthors: number[] = [];
  // Žánry
  genreSearch: string = '';
  genres: ModelsGenre[] = [];
  selectedGenres: number[] = [];
  // Knihy
  bookSearch: string = '';
  books: ModelsBook[] = [];
  loading: boolean = false;
  constructor(public bookService: BookService, private genreService: GenreService, private authorService: AuthorService) { }

  ngOnInit(): void {
    // Načtení autorů
    this.authorService.getAllAuthors().subscribe({
      next: (v) => {
        this.authors = v;
      },
      error: (e) => {
        alert(JSON.stringify(e));
      },
      complete: () => { }
    });
    // Načtení žánrů
    this.genreService.getAllGenres().subscribe({
      next: (v) => {
        this.genres = v;
      },
      error: (e) => {
        alert(JSON.stringify(e));
      },
      complete: () => { }
    });
    // Načtení knih
    this.searchBooks();
  }

  // Filtrace autorů
  getFilteredAuthors(): ModelsAuthor[] {
    return this.authors.filter(author => author.firstName.toLowerCase().includes(this.authorSearch.toLowerCase()) || author.lastName.toLowerCase().includes(this.authorSearch.toLowerCase()));
  }

  // Klik na autora
  authorClicked(authorId: number): void {
    if (this.selectedAuthors.includes(authorId)) {
      this.selectedAuthors = this.selectedAuthors.filter(id => id !== authorId);
    } else {
      this.selectedAuthors.push(authorId);
    }
  }

  // Filtrace žánrů
  getFilteredGenres(): ModelsGenre[] {
    return this.genres.filter(genre => genre.name.toLowerCase().includes(this.genreSearch.toLowerCase()));
  }

  // Klik na žánr
  genreClicked(genreId: number): void {
    if (this.selectedGenres.includes(genreId)) {
      this.selectedGenres = this.selectedGenres.filter(id => id !== genreId);
    } else {
      this.selectedGenres.push(genreId);
    }
  }

  // Formátování ceny
  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

  // Klik na knihu
  bookCardClicked(bookId: number): void {
    alert('TODO přesměrovat');
  }

  // Vyhledání knih
  searchBooks(): void {
    this.loading = true;
    this.books = [];
    this.bookService.searchBooks({
      authorIds: this.selectedAuthors,
      genreIds: this.selectedGenres,
      maxPrice: this.maxSelectedPrice,
      minPrice: this.minSelectedPrice,
      name: this.bookSearch
    }).subscribe({
      next: (v) => {
        this.books = v;
      },
      error: (e) => {
        this.loading = false;
        alert(JSON.stringify(e));
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
