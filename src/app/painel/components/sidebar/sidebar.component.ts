import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
    { path: 'user-profile', title: 'Perfil', icon: 'person', class: '' },
    { path: 'categoria-lancamento', title: 'Categorias', icon: 'description', class: '' },
    { path: 'entradas', title: 'Entradas', icon: 'trending_up', class: '' },
    { path: 'typography', title: 'Saídas', icon: 'trending_down', class: '' },
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    menuItems: any[];

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    public sair(): void {
        this.authService.sair()
    }
}
