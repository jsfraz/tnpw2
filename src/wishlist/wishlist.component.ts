import { Component, OnInit } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ModelsBook } from '../app/api/models/models-book';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { WishlistService } from '../app/api/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  imports: [MatSliderModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
  books: ModelsBook[] = [];
  totalPrice: number = 0;
  loading: boolean = false;

  constructor(public wishService: WishlistService, private router: Router) { }

  ngOnInit(): void {
      this.loadBooks();
  }

  // Načte knihy do košíku
  loadBooks() {
      this.loading = true;
      this.wishService.getAllBooksInWishlist().subscribe({
          next: (v) => {
              this.books = v;
              this.totalPrice = this.books.reduce((x, book) => x + book.price, 0);
          },
          error: (e) => {
              alert(JSON.stringify(e));
              console.error(e);
              this.loading = false;
          },
          complete: () => {
              this.loading = false;
          }
      });
  }

  // Odstraní knihu z košíku
  removeBook(bookId: number) {
      this.wishService.removeBookFromWishlist({ id: bookId }).subscribe({
          next: () => {
              this.loadBooks();
          },
          error: (e) => {
              alert(JSON.stringify(e));
              console.error(e);
              this.loadBooks();
          },
          complete: () => { }
      });
  }

  // Přesměruje na stránku s knihou
  bookCardClicked(bookId: number) {
      this.router.navigate(['/book-detail'], { queryParams: { id: bookId } });
  }
}
