import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../app/api/services/cart.service';
import { ModelsBook } from '../app/api/models';
import { BookService } from '../app/api/services/book.service';
import { Router } from '@angular/router';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-konec',
    imports: [
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSliderModule, MatProgressSpinnerModule
    ],
    templateUrl: './konec.component.html',
    styleUrl: './konec.component.css'
})
export class KonecComponent implements OnInit {
    books: ModelsBook[] = [];
    totalPrice: number = 0;
    loading: boolean = false;

    firstName = new FormControl<string>('', [Validators.required]);
    lastName = new FormControl<string>('', [Validators.required]);
    street = new FormControl<string>('', [Validators.required]);
    streetNumber = new FormControl<string>('', [Validators.required]);
    city = new FormControl<string>('', [Validators.required]);
    psc = new FormControl<string>('', [Validators.required]);
    phoneNumber = new FormControl<string>('', [Validators.required]);
    email = new FormControl<string>('', [Validators.required]);

    constructor(private router: Router, public cartService: CartService, private bookService: BookService) { }

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
