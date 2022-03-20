import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { OrdersListComponent } from './views/orders-list/orders-list.component';

const routes: Routes = [
  {path: '',  component: LoginComponent},
  {path: 'ordersList', component: OrdersListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
