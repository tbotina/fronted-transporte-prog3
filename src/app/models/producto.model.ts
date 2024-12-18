import { Categoria } from "./categoria.model";
import { Cliente } from "./cliente.model";
import { Lote } from "./lote.model";



export class Producto {
    id?: number;
    nombre: string;
    descripcion: string;
    precio: number;
    cliente_id: number;
    lote_id: number;
    cliente?:Cliente;
    lote?: Lote;
}
