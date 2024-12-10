import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import * as path from 'path';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'tables', component: TablesComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },

    {
        path: 'productos',
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/producto/producto.module').then(m => m.ProductoModule)
            }

        ]
    },
    {
        path: 'lotes',
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/lote/lote.module').then(m => m.LoteModule)
            }
        ]
    },
    {
        path: 'dir-lista-ordenes',
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/dir-lista-orden/dir-lista-orden.module').then(m => m.DirListaOrdenModule)
            }
        ]
    },
    {
        path: 'rutas',
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/ruta/ruta.module').then(m => m.RutaModule)
            }
        ]
    },
    {
        path: 'vehiculos',
        loadChildren: () => import('src/app/pages/vehiculos/vehiculos.module').then(m => m.VehiculosModule)
    },
    {
        path: 'duenos',
        loadChildren: () => import('src/app/pages/duenos/dueños.module').then(m => m.DuenosModule)
    }
];
