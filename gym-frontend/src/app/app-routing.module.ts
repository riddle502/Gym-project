import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './default/default.component';
import { SaleComponent } from './default/components/sale/sale.component';
import { ProductComponent } from './default/components/product/product.component';
import { DashboardComponent } from './default/dashboard/dashboard.component';
import { StockmangmentComponent } from './default/components/stockmangment/stockmangment.component';
import { CreatestoreComponent } from './default/components/createstore/createstore.component';
import { CreatuserComponent } from './default/components/creatuser/creatuser.component';
import { OrderbystoreComponent } from './default/components/orderbystore/orderbystore.component';
import { PaymentmodeComponent } from './default/components/paymentmode/paymentmode.component';
import { LoginComponent } from './default/components/login/login.component';
import { CurrentstockComponent } from './default/components/currentstock/currentstock.component';
import { SalesreportsComponent } from './default/components/salesreports/salesreports.component';
import { TransferreportComponent } from './default/components/transferreport/transferreport.component';
import { SalesreportbysellerComponent } from './default/components/salesreportbyseller/salesreportbyseller.component';
import { ProfitreportComponent } from './default/components/profitreport/profitreport.component';
import { ItemreportComponent } from './default/components/itemreport/itemreport.component';
import { CustmorsComponent } from './default/components/custmors/custmors.component';
import { ExpensesComponent } from './default/components/expenses/expenses.component';
import { CustomorsreturnComponent } from './default/components/customorsreturn/customorsreturn.component';
import { ProductassignComponent } from './default/components/productassign/productassign.component';
import { SaleslistComponent } from './default/components/saleslist/saleslist.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent,
  },
  {
    path: '', component: DefaultComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'sale',
        component: SaleComponent
      },
      {
        path: 'product',
        component: ProductComponent
      },
      {
        path: 'stockmangment',
        component: StockmangmentComponent
      },
      {
        path: 'createstore',
        component: CreatestoreComponent
      },
      {
        path: 'creatuser',
        component: CreatuserComponent
      },
      {
        path: 'orderbystore',
        component: OrderbystoreComponent
      },
      {
        path: 'paymentmode',
        component: PaymentmodeComponent
      },
      {
        path: 'currentstock',
        component: CurrentstockComponent
      },
      {
        path: 'salesreports',
        component: SalesreportsComponent
      },
      {
        path: 'transferreport',
        component: TransferreportComponent
      },
      {
        path: 'salesreportbyseller',
        component: SalesreportbysellerComponent
      },
      {
        path: 'profitreport',
        component: ProfitreportComponent
      },
      {
        path: 'itemreport',
        component: ItemreportComponent
      },
      {
        path: 'custmors',
        component: CustmorsComponent
      },
      {
        path: 'expenses',
        component: ExpensesComponent
      },
      {
        path: 'customorsreturn',
        component: CustomorsreturnComponent
      },
      {
        path: 'productassign',
        component: SaleslistComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],

  exports: [RouterModule]
})
export class AppRoutingModule {}
