import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

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
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
