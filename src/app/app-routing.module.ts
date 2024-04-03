import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { RouteUserComponent } from './sub-router/route-user/route-user.component'

//web-component
import { CreateOrderComponent } from './web-component/create-order/create-order.component';
import { OrderListComponent } from './web-component/order-list/order-list.component';

//authGuard
//import { authGuard } from './../authGuard';


let page= "page";

const routes: Routes = [
  //{ path: '', redirectTo: '/', pathMatch: 'full' }, 
  { path: '', redirectTo: '/page/create-order', pathMatch: 'full' },
  //======================== 頁面 ================================================================================
  { path: page, component: RouteUserComponent,
    children: [
      //{ path: 'home',  component: HomeComponent }, 
      { path: 'create-order',  component: CreateOrderComponent },
      { path: 'create-order/:member_qrcode',  component: CreateOrderComponent },
      { path: 'create-order/:member_qrcode/:charge_qrcode',  component: CreateOrderComponent },
      
      { path: 'order-list',  component: OrderListComponent },
      { path: 'order-list/:m_code',  component: OrderListComponent },
      { path: 'order-list/:m_code/:c_code',  component: OrderListComponent }, 
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

