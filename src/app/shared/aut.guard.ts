import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../shared/auth.service';

// Autor: Josef Ráž

// Auth guard pro stránky chráněné loginem
@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(public authService: AuthService, public router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // Přesměrování zpět na přihlášení pokud je token neplatný
    if (!this.authService.tokenValid) {
      this.authService.deleteToken();
      this.router.navigate(['']);
    }
    return true;
  }
}