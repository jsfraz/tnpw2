import { Component } from '@angular/core';
import { DashboardService } from '../app/api/services/dashboard.service';
import { finalize } from 'rxjs/operators';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ModelsBookPopularityStat, ModelsBookStat, ModelsCustomerActivity } from '../app/api/models';
@Component({
  selector: 'app-dashboard',
  imports: [MatProgressSpinner, MatCardModule, MatListModule, MatDatepickerModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  isLoading = false;
  error = '';
  activeView: string = '';
  
  bookStats: ModelsBookStat[] = [];
  popularityStats: ModelsBookPopularityStat[] = [];
  customerActivities: ModelsCustomerActivity[] = [];

  constructor(private dashboardService: DashboardService) {}

  showView(view: string) {
    this.activeView = view;
    this.error = ''; 
    this.isLoading = true;

    switch (view) {
      case 'bookStats':
        this.loadBookStats();
        break;
      case 'popularityStats':
        this.loadPopularityStats();
        break;
      case 'customerActivity':
        this.loadCustomerActivity();
        break;
    }
  }

  loadBookStats() {
    this.dashboardService.bookStats().subscribe({
      next: (v) => {
        this.bookStats = v;
      },
      error: (e) => {
        console.error(e);
        alert(JSON.stringify(e));
      },
      complete: () => { }
    });
  }

  loadPopularityStats() {
    this.dashboardService.bookPopularityStats().subscribe({
      next: (v) => {
        this.popularityStats = v;
      },
      error: (e) => {
        console.error(e);
        alert(JSON.stringify(e));
      },
      complete: () => { }
    });
  }

  loadCustomerActivity() {
    this.dashboardService.customerActivity().subscribe({
      next: (v) => {
        this.customerActivities = v;
      },
      error: (e) => {
        console.error(e);
        alert(JSON.stringify(e));
      },
      complete: () => { }
    });
  }
}
