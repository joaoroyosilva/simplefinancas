import { Injectable } from '@angular/core'
import { CanActivate, CanActivateChild } from '@angular/router'
import { AuthService } from './shared/services/auth.service';

@Injectable()

export class AuthGuard implements CanActivate, CanActivateChild {


    constructor(
        private authService: AuthService
    ) { }

    canActivate(): boolean {
        return this.authService.autenticado()
    }

    canActivateChild(): boolean {
        return this.authService.autenticado()
    }
}
