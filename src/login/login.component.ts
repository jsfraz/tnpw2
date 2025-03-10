import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../app/shared/auth.service';
import { AuthenticationService } from '../app/api/services/authentication.service';
import { UserService } from '../app/api/services/user.service';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [MatButtonModule, MatDividerModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  // Přihlašovací údaje
  mailLogin = new FormControl('', [Validators.required, Validators.email]);
  passwordLogin = new FormControl('', [Validators.required]);
  // Registrace
  firstNameRegister = new FormControl('', [Validators.required]);
  lastNameRegister = new FormControl('', [Validators.required]);
  mailRegister = new FormControl('', [Validators.required, Validators.email]);
  passwordRegister = new FormControl('', [Validators.required]);
  // Průběh přihlašování
  loggingIn: boolean = false;

  isRegistering = false;
  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(public router: Router, public authService: AuthService, private authenticationService: AuthenticationService, private userService: UserService) { }

  // Přesměrování pokud je už přihlášen
  ngOnInit(): void {
    if (this.authService.tokenValid) {
      // Načtení kdo jsem
      if (this.authService.currentUser == null && this.authService.tokenValid) {
        this.userService.whoAmI().subscribe(
          {
            next: (v) => {
              this.authService.currentUser = v;
              this.router.navigate(['']);
            },
            error: (e) => {
              console.error(e);
              alert(e.error.error);
            },
            complete: () => { }
          }
        );
      }
    } else {
      this.authService.deleteToken();
    }
  }

  zmenitForm() {
    this.isRegistering = !this.isRegistering;
  }

  prihlasit() {
    if (this.mailLogin.valid && this.passwordLogin.valid) {
      this.loggingIn = true;
      this.authenticationService.login({ body: { mail: this.mailLogin.value!, password: this.passwordLogin.value! } }).subscribe({
        next: (v) => {
          // Uložení tokenu do storage
          this.authService.token = v.accessToken;
          this.userService.whoAmI().subscribe(
            {
              next: (v) => {
                // Nastavení uživatele
                this.authService.currentUser = v;
                // Přesměrování
                this.router.navigate(['']);
              },
              error: (e) => {
                console.error(e);
                alert(e.error.error);
              }
            }
          );
        },
        error: (e) => {
          this.loggingIn = false;
          console.error(e);
          alert(e.error.error);
        },
        complete: () => {
          this.loggingIn = false;
        }
      });
    } else {
      // Zobrazení chyb
      this.mailLogin.markAsTouched();
      this.passwordLogin.markAsTouched();
    }
  }

  registrovat() {
    if (this.firstNameRegister.valid && this.lastNameRegister.valid && this.mailRegister.valid && this.passwordRegister.valid) {
      this.loggingIn = true;
      this.authenticationService.register({ body: { firstName: this.firstNameRegister.value!, lastName: this.lastNameRegister.value!, mail: this.mailRegister.value!, password: this.passwordRegister.value! } }).subscribe({
        next: (v) => {
          // Uložení tokenu do storage
          this.authService.token = v.accessToken;
          this.userService.whoAmI().subscribe(
            {
              next: (v) => {
                // Nastavení uživatele
                this.authService.currentUser = v;
                // Přesměrování
                this.router.navigate(['']);
              },
              error: (e) => {
                console.error(e);
                alert(e.error.error);
              }
            }
          );
        },
        error: (e) => {
          this.loggingIn = false;
          console.error(e);
          alert(e.error.error);
        },
        complete: () => {
          this.loggingIn = false;
        }
      });
    } else {
      // Zobrazení chyb
      this.mailLogin.markAsTouched();
      this.passwordLogin.markAsTouched();
    }
  }
}