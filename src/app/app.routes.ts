import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { BooksComponent } from '../books/books.component';
import { KosikComponent } from '../kosik/kosik.component';
import { UsersComponent } from '../users/users.component';
import { AuthorsComponent } from '../authors/authors.component';
import { GenresComponent } from '../genres/genres.component';
import { AuthGuard } from './shared/aut.guard';
import { HomeComponent } from '../home/home.component';
import { BookDetailComponent } from '../book-detail/book-detail.component';

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
    { path: 'book-detail', component: BookDetailComponent },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
