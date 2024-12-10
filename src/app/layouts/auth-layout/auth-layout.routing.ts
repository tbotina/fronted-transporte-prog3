import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { LoginComponent } from 'src/app/pages/login/login.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'tables', component: TablesComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'login',          component: LoginComponent },

    {
        path: "administrador", loadChildren: () => import('src/app/pages/administrador/administrador.module').then(m => m.AdministradorModule)
    },
    {
        path: "departamentos",
        loadChildren: () => import('src/app/pages/departamentos/departamentos.module').then(m => m.DepartamentosModule)
    },
    {
        path: "servicios",
        loadChildren: () => import('src/app/pages/servicios/servicios.module').then(m => m.ServiciosModule)
    },
    {
        path: "direccion", loadChildren: () => import('src/app/pages/direccion/direccion.module').then(m => m.DireccionModule)
    },
    {
        path: "dirlistarorden", loadChildren: () => import('src/app/pages/dirlistaorden/dirlistaorden.module').then(m => m.DirlistaordenModule)
    },
    {
        path: "personanatural", loadChildren: () => import('src/app/pages/persona-natural/persona-natural.module').then(m => m.PersonaNaturalModule)
    },

];
