import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';

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
import { ReceitaComponent } from './receita/receita.component';
import { CategoriaLancamentoComponent } from './categoria-lancamento/categoria-lancamento.component';
import { CategoriaModalComponent } from './categoria-lancamento/modal/categoria-modal.component';
//import { DeletaCategoriaComponent } from './categoria-lancamento/deleta-categoria/deleta-categoria.component';
import { ReceitaModalComponent } from './receita/modal/receita-modal.component';
import { GraficosService } from '../shared/services/graficos.service';
//import { DeletaReceitaComponent } from './receita/deleta-receita/deleta-receita.component';

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
    ReceitaComponent,
    ReceitaModalComponent,
    //DeletaReceitaComponent,
    CategoriaLancamentoComponent,
    CategoriaModalComponent,
    //DeletaCategoriaComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    PainelRoutingModule,
    MaterialModule,
  ],
  providers: [
    AuthGuard,
    FirebaseService,
    GraficosService,
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    { provide: MAT_DATE_LOCALE, useValue: 'pt-Br' },

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
  entryComponents: [
    CategoriaModalComponent,
    //DeletaCategoriaComponent,
    ReceitaModalComponent,
    //DeletaReceitaComponent
  ]
})
export class PainelModule { }
