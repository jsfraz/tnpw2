import { Component, OnInit } from '@angular/core';
import { OrderService } from '../app/api/services/order.service';
import { ModelsOrder } from '../app/api/models';

@Component({
  selector: 'app-orders',
  imports: [],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  orders: ModelsOrder[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (v) => {
        this.orders = v;
      },
      error: (error) => {
        alert(JSON.stringify(error));
        console.error(error);
      },
      complete: () => {
      }
    });
  }
}
