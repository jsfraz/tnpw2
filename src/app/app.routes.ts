import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { BooksComponent } from '../books/books.component';
import { KosikComponent } from '../kosik/kosik.component';
import { UsersComponent } from '../users/users.component';
import { AuthorsComponent } from '../authors/authors.component';
import { GenresComponent } from '../genres/genres.component';
import { AuthGuard } from './shared/auth.guard';
import { HomeComponent } from '../home/home.component';
import { BookDetailComponent } from '../book-detail/book-detail.component';
import { WishlistComponent } from '../wishlist/wishlist.component';
import { ReviewsComponent } from '../reviews/reviews.component';
import { KonecComponent } from '../konec/konec.component';
import { DashboardComponent } from '../dashboard/dashboard.component'; 
import { OrdersComponent } from '../orders/orders.component';
import { OrderSuccessComponent } from '../order-success/order-success.component';

export const routes: Routes = [
    // Přihlášení nebo registrace (stránka pro nepřihlášeného uživatele)
    { path: 'login', component: LoginComponent },
    // Domovská stránka s knihami (stránka pro všechny včetně nepřihlášeného uživatele)
    { path: 'home', component: HomeComponent },
    // Knihy (stránka pro admina a db managera)
    { path: 'books', component: BooksComponent, canActivate: [AuthGuard] },
    // Uživatelé (stránka pro admina a db managera)
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
    // Košík (stránka pro zákazníka)
    { path: 'kosik', component: KosikComponent, canActivate: [AuthGuard] },
    // Autoři (stránka pro admina a db managera)
    { path: 'authors', component: AuthorsComponent, canActivate: [AuthGuard] },
    // Žánry (stránka pro admina a db managera)
    { path: 'genres', component: GenresComponent, canActivate: [AuthGuard] },
    // Seznam přání (stránka pro zákazníka)
    { path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard] },
    // Detail knihy (stránka pro všechny včetně nepřihlášeného uživatele)
    { path: 'book-detail', component: BookDetailComponent },
    // Recenze (stránka pro admina a db managera)
    { path: 'reviews', component: ReviewsComponent, canActivate: [AuthGuard] },
    // Objednávka (stránka pro zákazníka)
    { path: 'konec', component: KonecComponent, canActivate: [AuthGuard] },
    // Dashboard (stránka pro admina)
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    // Objednávky (stránka pro admina)
    { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
    // Úspěšná objednávka (stránka pro zákazníka)
    { path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuard] },
    // Redirect
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
