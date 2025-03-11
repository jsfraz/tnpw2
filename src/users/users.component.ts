import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../app/api/services/user-management.service';
import { ModelsUser } from '../app/api/models/models-user';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
// TODO přidat tento komponent do routeru
export class UsersComponent implements OnInit {
  // Uživatelé s rolemi databaseManager a reviewApprover
  users: ModelsUser[] = [];

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
        firstName: '',
        lastName: '',
        mail: '',
        password: '',
        role: ''
      }
    }).subscribe({
      next: (v) => {
        // Znovunačtení (refresh) uživatelů
        this.loadUsers();
      },
      error: (e) => {
        console.error(e);
        alert(e.error.error);
      },
      complete: () => { }
    });
  }

  // TODO stejným způsobem aktualizace a mazání uživatelů je-li to třeba
}
