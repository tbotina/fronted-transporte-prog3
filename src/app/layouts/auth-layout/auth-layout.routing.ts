import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'tables', component: TablesComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    { path: "departamentos", loadChildren: () => import('src/app/pages/departamentos/departamentos.module').then(m => m.DepartamentosModule) },
    { path: 'productos', loadChildren: () => import('src/app/pages/producto/producto.module').then(m => m.ProductoModule) },
    { path: 'lotes', loadChildren: () => import('src/app/pages/lote/lote.module').then(m => m.LoteModule) },
    { path: 'dir-lista-ordenes', loadChildren: () => import('src/app/pages/dir-lista-orden/dir-lista-orden.module').then(m => m.DirListaOrdenModule) },
    { path: 'rutas', loadChildren: () => import('src/app/pages/ruta/ruta.module').then(m => m.RutaModule) },
];
