import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { RouterLink } from '@angular/router';

interface Gender {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-login',
  imports: [RouterLink, MatButtonModule, MatDividerModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
    isRegistering = false;
    hide = signal(true);

    genders : Gender[] = [
      {value: "male", viewValue: "Muž"},
      {value: "female", viewValue: "Žena"}
    ] 
    
    clickEvent(event: MouseEvent) {
      this.hide.set(!this.hide());
      event.stopPropagation();
    }

    zmenitForm() {
      this.isRegistering = !this.isRegistering;
    }

    prihlasit() {
      //TODO: prihlasovaci logika
    }

    registrovat() {
      //TODO: registrovaci logika
    }
}