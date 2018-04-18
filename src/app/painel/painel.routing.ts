import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ReceitaComponent } from './receita/receita.component';
import { CategoriaLancamentoComponent } from './categoria-lancamento/categoria-lancamento.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { PainelComponent } from './painel.component';
import { AuthGuard } from 'app/auth-guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'painel',
        component: PainelComponent,
        canActivateChild: [AuthGuard],
        children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'user-profile', component: UserProfileComponent },
          { path: 'receitas', component: ReceitaComponent },
          { path: 'typography', component: TypographyComponent },
          { path: 'categoria-lancamento', component: CategoriaLancamentoComponent },
          { path: 'maps', component: MapsComponent },
          { path: 'notifications', component: NotificationsComponent },
          { path: 'upgrade', component: UpgradeComponent },
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class PainelRoutingModule { }
