import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.module';
import { SecurityService } from 'src/app/services/security.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'nosotros',  icon: 'ni-satisfied text-red', class: '2' },
    { path: '/icons', title: 'chat',  icon:'ni-chat-round text-red', class: '1' },
    { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-red', class: '2' },
    { path: '/user-profile', title: 'perfil',  icon:'ni-single-02 text-red', class: '1' },
    { path: '/tables', title: 'utilidades',  icon:'ni-sound-wave text-red', class: '2' },
    { path: '/login', title: 'Login',  icon:'ni-key-25 text-red', class: '0' },
    { path: '/register', title: 'Register',  icon:'ni-circle-08 text-red', class: '0' },
    { path: '/servicios/list', title: 'servicios', icon:'ni-single-02 text-red', class: '1' },
    { path: '/administrador/list', title: 'administrador', icon:'ni-single-02 text-red', class: '1' },
    { path: '/cliente/list', title: 'cliente', icon:'ni-single-02 text-red', class: '1' },
    { path: '/personanatural/list', title: 'personanatural', icon:'ni-single-02 text-red', class: '1' },
    { path: '/direccion/list', title: 'direccion', icon:'ni-single-02 text-red', class: '1' },
    { path: '/dirlistaordenes/list', title: 'dirlistarorden', icon:'ni-single-02 text-red', class: '1' },
    { path: '/lotes/list', title: 'lotes', icon:'ni-sound-wave text-red', class: '1' },
    { path: '/rutas/list', title: 'rutas', icon:'ni-single-02 text-red', class: '1' },
    { path: '/vehiculos/list', title: 'vehiculos', icon:'ni-sound-wave text-red', class: '1' },
    { path: '/duenos/list', title: 'duenos', icon:'ni-single-02 text-red', class: '1' },
    { path: '/personasNaturales/list', title: 'personasNaturales', icon:'ni-single-02 text-red', class: '1' },
    { path: '/cuotas/list', title: 'cuotas', icon:'ni-single-02 text-red', class: '1' },
    { path: '/gastos/list', title: 'gastos', icon:'ni-sound-wave text-red', class: '1' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  theUser:User;
  subscription: Subscription;

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router, private theSecurityService: SecurityService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
   this.subscription=this.theSecurityService.getUser().subscribe(data=>{
    this.theUser=data;
  })
  }
  gettheSecurityService(){
    return this.theSecurityService
  }
}
