import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { AuthService } from './shared/auth.service';
import { UserService } from './api/services/user.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { CartService } from './api/services/cart.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatIconModule, MatDividerModule, MatButtonModule, MatBadgeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'DBS2_Frontend';
  cartItemCount = 0;

  constructor(public authService: AuthService, private userService: UserService, public router: Router, private cartService: CartService) {
    // Sledování změn routy a aktualizace počtu položek v košíku
    // Kontrola změny by mohla probíhat i v jiných komponentech, avšak implementace by byla náročnější
    if (this.authService.currentUser != null) {
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        this.loadCartItemCount();
      });
    }
  }

  ngOnInit(): void {
    // Načtení kdo jsem
    if (this.authService.currentUser == null && this.authService.tokenValid) {
      this.userService.whoAmI().subscribe(
        {
          next: (v) => {
            this.authService.currentUser = v;
            this.loadCartItemCount();
          },
          error: (e) => {
            this.authService.logout();
          },
          complete: () => { }
        }
      );
    }
  }

  // Načtení počtu položek v košíku
  loadCartItemCount() {
    this.cartService.getCartCount().subscribe({
      next: (v) => {
        this.cartItemCount = v.count;
      },
      error: (e) => {
        console.error(e);
        alert(JSON.stringify(e));
      },
      complete: () => { }
    });
  }
}
