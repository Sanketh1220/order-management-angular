import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrdersService } from 'src/app/services/orders.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  @Input() editThisOrder:any;
  @Input() editedOrder:any;
  orderForm: FormGroup;
  addDays:any;
  submitted = false;

  constructor(
    public ordersService: OrdersService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {
    this.orderForm = this.formBuilder.group({
      customerName : ['', [Validators.required]],
      address : ['', [Validators.required,  Validators.minLength(6),
      Validators.maxLength(40)]],
      telNum : ['', [Validators.required,   Validators.minLength(10), Validators.maxLength(10), Validators.pattern("[0-9']{10}")]],
      quantity : ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    if(this.editThisOrder == true){  
      this.orderForm.patchValue(this.editedOrder);
    }
    console.log("editedContact", this.editedOrder);
  }



 generateDueDate() {
  let fourDaysForward = new (moment() as any).add(2, 'day');
  return fourDaysForward.format('DD-MM-YYYY');
 }


  generateRandomOrderNumber() {
    return (Math.floor(10000000 + Math.random() * 9000)).toString();
  }

  calculateTotalAmount(quantity:any) {
    return (quantity*300).toString();
  }

  onSubmit() {
    this.submitted = true;
    console.log('clicked', this.orderForm.value, this.orderForm.value.customerName);
    if (this.orderForm.valid && this.submitted == true) {
      let payload = {
        orderNumber: this.generateRandomOrderNumber(),
        totalAmount: this.calculateTotalAmount(this.orderForm.value.quantity),
        dueDate: '24-03-2022',
        customerName: this.orderForm.value.customerName,
        address: this.orderForm.value.address,
        quantity: this.orderForm.value.quantity,
        telNum: this.orderForm.value.telNum,
      }
      this.ordersService.addOrderToLocalStorage(payload);
      this.activeModal.close('close');
    }
    return false;
  }

}
