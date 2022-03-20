import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor() {}

  getAllOrders() {
    return JSON.parse(localStorage.getItem('Orders') || "[]");
  }

  setItemToLocalStorage(orders: any) {
    localStorage.setItem('Orders', JSON.stringify(orders))
  }

  addOrderToLocalStorage(order: any) {
    this.addOrder(order);
  }

  addOrder(order: any) {
    let orders: any = [];
    if(localStorage.getItem('Orders')) {
      orders = this.getAllOrders(); 
      orders = [order , ...orders];
    }else {
      orders = [order];
    }
    this.setItemToLocalStorage(orders);
  }

  deleteOrder(order: any) {
    let orders = this.getAllOrders();
    let index = orders.findIndex((x: { orderNumber: String; }) => x.orderNumber === order.orderNumber);
    orders.splice(index, 1);
    this.setItemToLocalStorage(orders);
  }
}
