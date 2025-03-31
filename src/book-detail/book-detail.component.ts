import { Component, OnInit } from '@angular/core';
import { BookService } from '../app/api/services/book.service';
import { ModelsBook } from '../app/api/models/models-book';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../app/api/services/cart.service';
import { AuthService } from '../app/shared/auth.service';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../app/api/services/wishlist.service';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../app/api/services/review.service';
import { ModelsReview } from '../app/api/models/models-review';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerReviewService } from '../app/api/services/customer-review.service';

@Component({
  selector: 'app-book-detail',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit {
  book: ModelsBook | null = null;
  isInCart: boolean = false;
  showForm: boolean = false;
  isInWish: boolean = false;
  reviews: ModelsReview[] = [];
  reviewRating: number = 5;
  reviewText: string = '';
  // Indikuje zda recenze čeká na schválení
  reviewWaiting: boolean = false;

  constructor(public bookService: BookService, private cartService: CartService, private route: ActivatedRoute, public authService: AuthService, private router: Router, private wishService: WishlistService, private reviewService: ReviewService, private customerReviewService: CustomerReviewService) { }

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
                this.loadIsReviewWaiting();
              }
            }
            this.loadReviews();
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

  // Načtení hodnocení knihy
  loadReviews(): void {
    this.reviewService.getApprovedReviewsByBookId({
      id: this.book!.id
    }).subscribe({
      next: (v) => {
        this.reviews = v;
      },
      error: (e) => {
        console.error(e);
        alert(JSON.stringify(e));
      },
      complete: () => { },
    });
  }

  // Odeslání recenze ke schválení
  submitReview() {
    // Převod reviewRating z řetězce na číslo
    const rating = Number(this.reviewRating); // Používáme Number() pro převod

    if (isNaN(rating) || rating < 1 || rating > 5) {
      alert('Hodnocení musí být číslo od 1 do 5.');
      return;
    }

    const newReview = {
      bookId: this.book!.id,
      userId: this.authService.currentUser!.id,
      text: this.reviewText,
      stars: rating,
      approved: false
    };

    this.customerReviewService.createReview({ body: newReview }).subscribe({
      next: () => {
        this.reviewText = '';
        this.reviewRating = 5;
      },
      error: (e) => {
        console.error(e);
        alert(JSON.stringify(e));
      },
      complete: () => {
        this.reviewWaiting = true;
      }
    });
  }

  // Vrátí zda užuživatel knihu zrecenzoval
  hasReview() {
    return this.reviews.some(review => review.user.id == this.authService.currentUser!.id);
  }

  loadIsReviewWaiting() {
    this.customerReviewService.isUserReviewBeingApproved({ id: this.book!.id }).subscribe({
      next: (v) => {
        this.reviewWaiting = v.value;
      },
      error: (e) => {
        console.error('Chyba při odesílání recenze:', e);
        alert(JSON.stringify(e));
      },
      complete: () => { },
    });
  }
}