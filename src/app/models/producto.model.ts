import { Categoria } from "./categoria.model";

export class Producto {
    id?: number;
    nombre: string;
    cliente_id?: number;
    categoria_id?: number;
    categoria?: Categoria[];
}
