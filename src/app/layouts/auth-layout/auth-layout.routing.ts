





import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },

    {
        path: "administradores", loadChildren: () => import('src/app/pages/administrador/administrador.module').then(m => m.AdministradorModule)
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
        path: "conductores", loadChildren: () => import('src/app/pages/conductores/conductores.module').then(m => m.ConductoresModule)
    },
    {
        path: "contratos", loadChildren: () => import('src/app/pages/contrato/contrato.module').then(m => m.ContratoModule)
    }
    

];
