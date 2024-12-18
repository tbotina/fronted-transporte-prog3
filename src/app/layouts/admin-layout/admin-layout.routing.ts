import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',canActivate:[AuthGuard],   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    {path:"administrador", canActivate:[AuthGuard],
    loadChildren: () => import('src/app/pages/administrador/administrador.module').then(m => m.AdministradorModule)
    },
    {
        path: "departamentos",canActivate:[AuthGuard],
        loadChildren: () => import('src/app/pages/departamentos/departamentos.module').then(m => m.DepartamentosModule)
    },
    {
        path: "servicios",canActivate:[AuthGuard],
        loadChildren: () => import('src/app/pages/servicios/servicios.module').then(m => m.ServiciosModule)
    },
    {

        path: "direccion",canActivate:[AuthGuard], loadChildren: () => import('src/app/pages/direccion/direccion.module').then(m => m.DireccionModule)
    },
    {
        path: "dirlistarorden",canActivate:[AuthGuard], loadChildren: () => import('src/app/pages/dirlistaorden/dirlistaorden.module').then(m => m.DirlistaordenModule)
    },
    {
        path: "cliente",canActivate:[AuthGuard], loadChildren: () => import('src/app/pages/cliente/cliente.module').then(m => m.ClienteModule)
    },
    {
        path: 'productos',canActivate:[AuthGuard],
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/producto/producto.module').then(m => m.ProductoModule)
            }

        ]
    },
    {
        path: 'lotes',canActivate:[AuthGuard],
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/lote/lote.module').then(m => m.LoteModule)
            }
        ]
    },
    {
        path: 'dirlistaordenes',canActivate:[AuthGuard],
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/dir-lista-orden/dir-lista-orden.module').then(m => m.DirListaOrdenModule)
            }
        ]
    },
    {
        path: 'rutas',canActivate:[AuthGuard],
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/ruta/ruta.module').then(m => m.RutaModule)
            }
        ]
    },
    {
        path: 'vehiculos',canActivate:[AuthGuard],
        loadChildren: () => import('src/app/pages/vehiculos/vehiculos.module').then(m => m.VehiculosModule)
    },
    {
        path: 'duenos',canActivate:[AuthGuard],
        loadChildren: () => import('src/app/pages/duenos/dueños.module').then(m => m.DuenosModule)
    },
    {
        path: 'personasNaturales',canActivate:[AuthGuard],
        loadChildren: () => import('src/app/pages/persona-natural/persona-natural.module').then(m => m.PersonaNaturalModule)
    },
    {
        path: 'cuotas',canActivate:[AuthGuard],
        loadChildren: () => import('src/app/pages/cuotas/cuotas.module').then(m => m.CuotasModule)
    },
    {
        path: 'gastos',canActivate:[AuthGuard],
        loadChildren: () => import('src/app/pages/gasto/gasto.module').then(m => m.GastoModule)
    }
];
