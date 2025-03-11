import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../app/api/services/user-management.service';
import { ModelsUser } from '../app/api/models/models-user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  imports: [FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})

export class UsersComponent implements OnInit {
  // Uživatelé s rolemi databaseManager a reviewApprover
  users: ModelsUser[] = [];
  showForm = false;
  newUser = {
    firstName: '',
    lastName: '',
    mail: '',
    password: '',
    role: ''
  };

  constructor(private userManagementService: UserManagementService) { }

  // Metoda která se volá sama při inicializaci komponentu
  ngOnInit(): void {
    this.loadUsers();
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
        alert(e.error.error);
      },
      complete: () => { }
    });
  }

  // Vytvoření nového uživatele s rolí databaseManager nebo reviewApprover
  createUser() {
    this.userManagementService.createUser({
      body: {
        // TODO doplnit
        firstName: this.newUser.firstName,
        lastName: this.newUser.lastName,
        mail: this.newUser.mail,
        password: this.newUser.password,
        role: this.newUser.role
      }
    }).subscribe({
      next: (v) => {
        // Znovunačtení (refresh) uživatelů
        this.loadUsers();
        this.showForm = false;
        this.newUser
      },
      error: (e) => {
        console.error(e);
        alert(e.error.error);
      },
      complete: () => { }
    });
  }

  //TODO: metoda vrati 'databaseManager', 'reviewApprover' family friendly textem

  // TODO stejným způsobem aktualizace a mazání uživatelů je-li to třeba
}
