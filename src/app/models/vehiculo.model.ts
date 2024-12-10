import { Conductor } from "./conductor.model";
import { Dueno } from "./dueno.model";
import { Ruta } from "./ruta.model";

export class Vehiculo {
    id?: number;
    placa:string;
    tipo_vehiculo: string;
    municipio_id?: number;
    municipio?: string;
    dueno?: Dueno;
    conductor?: Conductor;
    ruta?: Ruta;
}
