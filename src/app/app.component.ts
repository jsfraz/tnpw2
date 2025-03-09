import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { AuthService } from './shared/auth.service';
import { UserService } from './api/services/user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'DBS2_Frontend';

  constructor(public authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    // Načtení kdo jsem
    if (this.authService.currentUser == null && this.authService.tokenValid) {
      this.userService.whoAmI().subscribe(
        {
          next: (v) => {
            this.authService.currentUser = v;
            console.log(v);
          },
          error: (e) => {
            this.authService.logout();
          },
          complete: () => { }
        }
      );
    }
  }
}
