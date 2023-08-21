import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './default/dashboard/dashboard.component';
import { DefaultComponent } from './default/default.component';
import { SidenavbarComponent } from './default/sidenavbar/sidenavbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgChartsModule } from 'ng2-charts';
import { ProductComponent } from './default/components/product/product.component';
import { ModuleModule } from './module/module.module';
import { SaleComponent } from './default/components/sale/sale.component';
import { ProductcategriesComponent } from './default/components/product/productcategries/productcategries.component';
import { StockmangmentComponent } from './default/components/stockmangment/stockmangment.component';
import { AddstockComponent } from './default/components/stockmangment/addstock/addstock.component';
import { AddtransferstockComponent } from './default/components/stockmangment/addtransferstock/addtransferstock.component';
import { CreatestoreComponent } from './default/components/createstore/createstore.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreatuserComponent } from './default/components/creatuser/creatuser.component';
import { OrderbystoreComponent } from './default/components/orderbystore/orderbystore.component';
import { PaymentmodeComponent } from './default/components/paymentmode/paymentmode.component';
import { LoginComponent } from './default/components/login/login.component';
import { CurrentstockComponent } from './default/components/currentstock/currentstock.component';
import { TransferreportComponent } from './default/components/transferreport/transferreport.component';
import { SalesreportbysellerComponent } from './default/components/salesreportbyseller/salesreportbyseller.component';
import { ProfitreportComponent } from './default/components/profitreport/profitreport.component';
import { ItemreportComponent } from './default/components/itemreport/itemreport.component';
import { SalesreportsComponent } from './default/components/salesreports/salesreports.component';
import { CustmorsComponent } from './default/components/custmors/custmors.component';
import { ExpensesComponent } from './default/components/expenses/expenses.component';
import { CustomorsreturnComponent } from './default/components/customorsreturn/customorsreturn.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './default/components/interceptor/auth.interceptor';
import { LoginService } from './default/components/login/service/login.service';
import { ProductassignComponent } from './default/components/productassign/productassign.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
// mport { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { SaleslistComponent } from './default/components/saleslist/saleslist.component';
// import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DefaultComponent,
    SidenavbarComponent,
    ProductComponent,
    SaleComponent,
    ProductcategriesComponent,
    StockmangmentComponent,
    AddstockComponent,
    AddtransferstockComponent,
    CreatestoreComponent,
    CreatuserComponent,
    OrderbystoreComponent,
    PaymentmodeComponent,
    LoginComponent,
    CurrentstockComponent,
    TransferreportComponent,
    SalesreportbysellerComponent,
    ProfitreportComponent,
    ItemreportComponent,
    SalesreportsComponent,
    CustmorsComponent,
    ExpensesComponent,
    CustomorsreturnComponent,
    ProductassignComponent,
    SaleslistComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HighchartsChartModule,
    NgChartsModule,
    ModuleModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatCheckboxModule,
    MatIconModule,
    MatMenuModule
  ],
  providers: [
    LoginService,
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
