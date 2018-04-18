import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PainelModule } from './painel/painel.module';
import { RegistroComponent } from './registro/registro.component';
import { AuthService } from './shared/services/auth.service';
import { MessageService } from './shared/services/message.service';
import { AuthGuard } from './auth-guard';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    PainelModule,
    FormsModule,
    HttpModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [
    AuthService,
    MessageService,
    AuthGuard,
    { provide: LOCALE_ID, useValue: 'pt-Br' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
