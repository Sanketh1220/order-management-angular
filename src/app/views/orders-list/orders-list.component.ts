import { PlatformLocation } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { OrdersService } from 'src/app/services/orders.service';
import { OrderFormComponent } from '../order-form/order-form.component';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
  modalRef: NgbModalRef | undefined;
  orders: any;

  constructor(
    private ngbModal:NgbModal,
    public orderService: OrdersService,
    public platformLocation: PlatformLocation 
  ) {
    platformLocation.onPopState(() => this.ngbModal.dismissAll());
   }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    this.orders =  this.orderService.getAllOrders();
  }

  confirmDelete(order: any){
    console.log("deleting", order);
    this.orderService.deleteOrder(order);
    this.orders =  this.orderService.getAllOrders();
  }

  editContact(order: any) {
    console.log("editing", order);
    this.confirmDelete(order);
    window.scroll(0,0);
    let ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',
      centered: true,
      size: 'lg',
    };
    this.modalRef =  this.ngbModal.open(OrderFormComponent, ngbModalOptions);
    console.log("editing", order);
    this.modalRef.componentInstance.editedOrder = order;
    this.modalRef.componentInstance.editThisOrder = true;
    this.modalRef.result.then((result) => {
      if(result === 'close'){
        this.orders =  this.orderService.getAllOrders();
      }
    });
  }


  openModal() {
    window.scroll(0,0);
    let ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',
      keyboard : false,
      centered: true,
      size: 'lg',
    };
    this.modalRef =  this.ngbModal.open(OrderFormComponent, ngbModalOptions);
    this.modalRef.componentInstance.editThisContact = false;
    this.modalRef.result.then((result) => {
      if(result === 'close'){
        this.orders =  this.orderService.getAllOrders();
      }
    })
  }
}
