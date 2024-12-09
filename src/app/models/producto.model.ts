import { Categoria } from "./categoria.model";
import { Lote } from "./lote.model";

export class Producto {
    id?: number;
    nombre: string;
    cliente_id?: number;
    lote_id?: number;
    lote?: Lote;
}
