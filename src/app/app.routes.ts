import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AppComponent } from './app.component';
import { BooksComponent } from '../books/books.component';
import { KosikComponent } from '../kosik/kosik.component';
import { UsersComponent } from '../users/users.component';
import { AuthorsComponent } from '../authors/authors.component';
import { GenresComponent } from '../genres/genres.component';

export const routes: Routes = [
    // Přihlášení
    { path: 'login', component: LoginComponent },
    // TODO popsat
    { path: 'home', component: AppComponent },
    { path: 'books', component: BooksComponent },
    { path: 'users', component: UsersComponent },
    { path: 'kosik', component: KosikComponent },
    { path: 'authors', component: AuthorsComponent},
    { path: 'genres', component: GenresComponent},
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
