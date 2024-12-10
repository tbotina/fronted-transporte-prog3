import { RutaModule } from "../pages/ruta/ruta.module";
import { DirListaOrden } from "./dir-lista-orden.model";
import { Ruta } from "./ruta.model";

export class Lote {
    id?: number;
    cantidad_productos: number;
    peso_total: number;
    fecha_creacion: Date;
    fecha_entrega: Date;
    dir_lista_orden_id: number;
    dir_lista_orden?: DirListaOrden;
    ruta_id: number;
    ruta?: Ruta;
}
