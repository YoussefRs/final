import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { LoginComponent } from './pages/login/login.component';
import { ExecutionComponent } from './pages/execution/execution.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UsersComponent } from './pages/admin/dashboard/dashboardComponents/users/users.component';
import { ProceduresComponent } from './pages/admin/dashboard/dashboardComponents/procedures/procedures.component';
import { GestionProceduresComponent } from './pages/admin/dashboard/dashboardComponents/gestion-procedures/gestion-procedures.component';
import { AuthGuard } from './API/auth.Guard';
import { ChartComponent } from './pages/admin/dashboard/dashboardComponents/chart/chart.component';


const routes: Routes = [
  { path : '', redirectTo:'/accueil', pathMatch: 'full' },
  { path : 'accueil', component: AccueilComponent },
  { path : 'login', component: LoginComponent },
  { path : 'execution', component: ExecutionComponent },
  { path : 'admin/dashboard', component: DashboardComponent, children : [
    { path : 'utilisateur', component: UsersComponent },
    { path : 'procedure/liste', component: ProceduresComponent },
    { path : 'procedure/gestion', component: GestionProceduresComponent },
    { path : 'procedure/stats', component : ChartComponent}
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
