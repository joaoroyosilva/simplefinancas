import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { PainelRoutingModule } from './painel.routing';
import { ComponentsModule } from './components/components.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { PainelComponent } from './painel.component';
import { AuthGuard } from '../auth-guard';
import { MaterialModule } from '../material.module';
import { FirebaseService } from '../shared/services/firebase.service';
import { EntradasComponent } from './entradas/entradas.component';
import { CategoriaLancamentoComponent } from './categoria-lancamento/categoria-lancamento.component';
import { CategoriaModalComponent } from './categoria-lancamento/modal/categoria-modal.component';

@NgModule({
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    PainelComponent,
    EntradasComponent,
    CategoriaLancamentoComponent,
    CategoriaModalComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    PainelRoutingModule,
    MaterialModule
  ],
  providers: [
    AuthGuard,
    FirebaseService
  ],
  entryComponents:[
    CategoriaModalComponent
  ]
})
export class PainelModule { }
