import { Component, OnInit } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ModelsBook } from '../app/api/models/models-book';
import { BookService } from '../app/api/services/book.service';
import { CartService } from '../app/api/services/cart.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
@Component({
    selector: 'app-books',
    imports: [RouterLink, RouterLinkActive, MatSliderModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule],
    templateUrl: './kosik.component.html',
    styleUrl: './kosik.component.css'
})
export class KosikComponent implements OnInit {
    books: ModelsBook[] = [];
    totalPrice: number = 0;
    loading: boolean = false;

    constructor(public cartService: CartService, private router: Router) { }

    ngOnInit(): void {
        this.loadBooks();
    }

    // Načte knihy do košíku
    loadBooks() {
        this.loading = true;
        this.cartService.getAllBooksInCart().subscribe({
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
        this.cartService.removeBookFromCart({ id: bookId }).subscribe({
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
