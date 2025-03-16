import { Component, OnInit, signal } from '@angular/core';
import { UserManagementService } from '../app/api/services/user-management.service';
import { ModelsUser } from '../app/api/models/models-user';
import { MatInputModule } from '@angular/material/input'; 
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-users',
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatSelectModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})

export class UsersComponent implements OnInit {
  // Uživatelé s rolemi databaseManager a reviewApprover
  users: ModelsUser[] = [];
  showForm = false;
  hide = signal(true);
  /*newUser = {
    firstName: '',
    lastName: '',
    mail: '',
    password: '',
    role: ''
  };*/

  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  mail = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  role = new FormControl('', [Validators.required]);

  roleOptions = [
    { value: 'databaseManager', viewValue: 'Databázový správce' },
    { value: 'reviewApprover', viewValue: 'Moderátor recenzí' }
  ];

  constructor(private userManagementService: UserManagementService) { }

  // Metoda která se volá sama při inicializaci komponentu
  ngOnInit(): void {
    this.loadUsers();
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  getRoleDisplayName(role: string): string {
    const roleOption = this.roleOptions.find(option => option.value === role);
    return roleOption ? roleOption.viewValue : role;
  }

  resetForm() {
    this.firstName.reset();
    this.lastName.reset();
    this.mail.reset();
    this.password.reset();
    this.role.reset();
  }

  // Načtení uživatelů
  loadUsers() {
    this.userManagementService.getUsersByRoles({ roles: ['databaseManager', 'reviewApprover'] }).subscribe({
      next: (v) => {
        // Přiřazení uživatelů do proměnné
        this.users = v;
      },
      error: (e) => {
        console.error(e);
        alert(JSON.stringify(e));
      },
      complete: () => { }
    });
  }

  // Vytvoření nového uživatele s rolí databaseManager nebo reviewApprover
  createUser() {
    if (this.mail.valid && this.password.valid && this.role.valid) {
      this.userManagementService.createUser({
      body: {
        firstName: this.firstName.value!,
        lastName: this.lastName.value!,
        mail: this.mail.value!,
        password: this.password.value!,
        role: this.role.value!
      }
    }).subscribe({
      next: (v) => {
        // Znovunačtení (refresh) uživatelů
        this.loadUsers();
        this.showForm = false;
        this.resetForm();
      },
      error: (e) => {
        console.error(e);
        alert(JSON.stringify(e));
      },
      complete: () => { }
    });
    } else {
      this.mail.markAsTouched();
      this.password.markAsTouched();
      this.role.markAsTouched();
    } 
  }

  // TODO stejným způsobem aktualizace a mazání uživatelů je-li to třeba
}
