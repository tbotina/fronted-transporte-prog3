import { Conductor } from "./conductor.model";
import { Dueno } from "./dueno.model";
import { Servicios } from "./servicios.model";

export class Gasto {
    id?: number;
    cantidad: number;
    dueno_id: number;
    dueno?: Dueno;
    conductor_id: number;
    conductor?: Conductor;
    servicio_id: number;
    servicio?: Servicios;
    factura_id: number;
}
