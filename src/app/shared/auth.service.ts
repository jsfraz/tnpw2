import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ModelsUser } from '../api/models';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Inject } from '@angular/core';

// Autor: Josef Ráž

// Služba pro kontrolu přihlášeného uživatele
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    currentUser: ModelsUser | null = null;

    constructor(public router: Router, private jwtHelper: JwtHelperService) { }

    // Odhlášení
    logout(): void {
        this.currentUser = null;
        this.deleteToken();
        this.router.navigate(['']);
    }

    // Vrátí token
    get token(): string | null {
        return localStorage.getItem('access_token');
    }

    // Nastaví token
    set token(token: string) {
        localStorage.setItem('access_token', token);
    }

    // Smaže token ze storage
    deleteToken(): void {
        localStorage.removeItem('access_token');
    }

    // Vrátí zda je token platný
    get tokenValid(): boolean {
        let token = this.token;
        // Kontrola zda není token prázdný
        if (token == null) {
            return false;
        }
        // Kontrola dekódováním zda je validní
        try {
            this.jwtHelper.decodeToken(token!);
        } catch (e: any) {
            console.error(e);
            return false;
        }
        // Kontrola zda je platný
        return !this.jwtHelper.isTokenExpired(token);
    }

    get isAdmin(): boolean {
        return this.currentUser!.role == 'admin'; 
    }
}