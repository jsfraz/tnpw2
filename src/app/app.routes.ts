import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AppComponent } from './app.component';
import { BooksComponent } from '../books/books.component';
import { KosikComponent } from '../kosik/kosik.component';
import { UsersComponent } from '../users/users.component';

export const routes: Routes = [
    // Přihlášení
    { path: 'login', component: LoginComponent },
    // TODO popsat
    { path: 'home', component: AppComponent },
    { path: 'books', component: BooksComponent },
    { path: 'users', component: UsersComponent },
    { path: 'kosik', component: KosikComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
