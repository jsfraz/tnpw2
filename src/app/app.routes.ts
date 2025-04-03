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

export const routes: Routes = [
    // Přihlášení
    { path: 'login', component: LoginComponent },
    // TODO popsat
    { path: 'home', component: HomeComponent },
    { path: 'books', component: BooksComponent, canActivate: [AuthGuard] },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
    { path: 'kosik', component: KosikComponent, canActivate: [AuthGuard] },
    { path: 'authors', component: AuthorsComponent, canActivate: [AuthGuard] },
    { path: 'genres', component: GenresComponent, canActivate: [AuthGuard] },
    { path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard] },
    { path: 'book-detail', component: BookDetailComponent },
    { path: 'reviews', component: ReviewsComponent, canActivate: [AuthGuard] },
    { path: 'konec', component: KonecComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
