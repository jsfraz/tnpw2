import { Component, OnInit } from '@angular/core';
import { BookService } from '../app/api/services/book.service';
import { ModelsBook } from '../app/api/models/models-book';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../app/api/services/cart.service';
import { AuthService } from '../app/shared/auth.service';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../app/api/services/wishlist.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-detail',
  imports: [RouterLink, CommonModule],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit {
  book: ModelsBook | null = null;
  isInCart: boolean = false;
  showForm: boolean = false;
  isInWish: boolean = false;

  constructor(public bookService: BookService, private cartService: CartService, private route: ActivatedRoute, public authService: AuthService, private router: Router, private wishService: WishlistService) { }

  ngOnInit(): void {
    // Načtení knihy podle ID z URL
    this.route.queryParams.subscribe((params) => {
      var bookId: number | null = params['id'];
      if (bookId == null) {
        alert('Chybějící URL parametr id!');
      } else {
        this.bookService.getBookById({ id: bookId }).subscribe({
          next: (v) => {
            this.book = v;
            if (this.authService.currentUser != null) {
              if (this.authService.currentUser.role == 'customer') {
                this.isInCartLoad();
                this.isInWishLoad();
              }
            }
          },
          error: (e) => {
            console.error(e);
            alert(JSON.stringify(e));
          },
          complete: () => { },
        });
      }
    });
  }

  // Načtení zda je kniha v košíku
  isInCartLoad() {
    this.cartService.isBookInCart({ id: this.book!.id }).subscribe({
      next: (v) => {
        this.isInCart = v.value;
      },
      error: (e) => {
        console.error(e);
      },
      complete: () => { },
    });
  }

  // Přidání knihy do košíku
  addToCart() {
    this.cartService.addBookToCart({ id: this.book!.id }).subscribe({
      next: (v) => {
        this.isInCart = true;
      },
      error: (e) => {
        console.error(e);
        alert(JSON.stringify(e));
      },
      complete: () => { },
    });
  }

  // Odebrání knihy z košíku
  removeFromCart() {
    this.cartService.removeBookFromCart({ id: this.book!.id }).subscribe({
      next: (v) => {
        this.isInCart = false;
      },
      error: (e) => {
        console.error(e);
        alert(JSON.stringify(e));
      },
      complete: () => { },
    });
  }

  // Načtení zda je kniha v košíku
  isInWishLoad() {
    this.wishService.isBookInWishlist({ id: this.book!.id }).subscribe({
      next: (v) => {
        this.isInWish = v.value;
      },
      error: (e) => {
        console.error(e);
      },
      complete: () => { },
    });
  }

  // Přidání knihy do košíku
  addToWish() {
    this.wishService.addBookToWishlist({ id: this.book!.id }).subscribe({
      next: (v) => {
        this.isInWish = true;
      },
      error: (e) => {
        console.error(e);
        alert(JSON.stringify(e));
      },
      complete: () => { },
    });
  }

  // Odebrání knihy z košíku
  removeFromWish() {
    this.wishService.removeBookFromWishlist({ id: this.book!.id }).subscribe({
      next: (v) => {
        this.isInWish = false;
      },
      error: (e) => {
        console.error(e);
        alert(JSON.stringify(e));
      },
      complete: () => { },
    });
  }

  isWishButtonDisabled() {
    if (this.authService.currentUser == null) {
      return false;
    }
    if (this.authService.currentUser.role != 'customer') {
      return true;
    }
    return false;
  }

  handleWishButton() {
    if (this.authService.currentUser != null) {
      if (this.isInWish) {
        this.removeFromWish();
      } else {
        this.addToWish();
      }
    } else {
      this.cartButtonRedirect();
    }
  }







  // Zjištění, zda je tlačítko zakázáno
  isCartButtonDisabled() {
    if (this.authService.currentUser == null) {
      return false;
    }
    if (this.authService.currentUser.role != 'customer') {
      return true;
    }
    return false;
  }

  // Přesměrování na login stránku
  cartButtonRedirect() {
    this.router.navigate(['/login'], { queryParams: { redirect: this.route.snapshot.url.join('/') + '?id=' + this.book!.id } });
  }

  handleCartButton() {
    if (this.authService.currentUser != null) {
      if (this.isInCart) {
        this.removeFromCart();
      } else {
        this.addToCart();
        this.showForm = true;
      }
    } else {
      this.cartButtonRedirect();
    }
  }
}