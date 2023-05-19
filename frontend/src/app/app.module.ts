import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule} from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { LoginComponent } from './pages/login/login.component';
import { ExecutionComponent } from './pages/execution/execution.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { SublevelMenuComponent } from './pages/admin/dashboard/sublevel-menu.component';
import { UsersComponent } from './pages/admin/dashboard/dashboardComponents/users/users.component';
import { ProceduresComponent } from './pages/admin/dashboard/dashboardComponents/procedures/procedures.component';
import { ChartComponent } from './pages/admin/dashboard/dashboardComponents/chart/chart.component';
import { RapportComponent } from './pages/admin/dashboard/dashboardComponents/rapport/rapport.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    AccueilComponent,
    LoginComponent,
    ExecutionComponent,
    DashboardComponent,
    SublevelMenuComponent,
    UsersComponent,
    ProceduresComponent,
    ChartComponent,
    RapportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatIconModule,
    HttpClientModule,
    MatMenuModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
