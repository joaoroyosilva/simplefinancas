import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { AuthGuard } from './auth-guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'painel',
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'auth/registro',
    component: RegistroComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
